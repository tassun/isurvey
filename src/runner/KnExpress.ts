import { Application } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import cookieparser from 'cookie-parser';
import config from "will-util";
import helmet from "helmet";

export class KnExpress {
    
    public static createApplication(options?: {http?: boolean, port?: number, https?: boolean, https_port?: number, key?: string, cert?: string, https_redirect?: boolean }) : Application {
        const sessionSecret = config.env("SESSION_SECRET","WillExpressGateWaySecretSettings");
        const sessionTimeout = parseInt(config.env("SESSION_TIMEOUT","108000000")) || 30*60*60*1000; //30 mins. expired
        const app : Application = express();
        app.set('view engine','ejs'); 
        app.use(express.json());
        app.use(cookieparser());
        app.use(express.urlencoded({ extended: false }));
        app.use(cors({
            credentials: false,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']
        }));
        app.use(
            session({
              secret: sessionSecret,
              resave: false,
              saveUninitialized: false,
              cookie: {
                  maxAge: sessionTimeout,
                  httpOnly: true,
              },
            })
        );
        app.disable('x-powered-by'); 
        app.use(helmet({
            contentSecurityPolicy: false,
            crossOriginOpenerPolicy: false,
            crossOriginResourcePolicy: false, 
        }));
        app.use(express.static("public"));

        const EXPRESS_HTTP = config.env("EXPRESS_HTTP","true")==="true";
        const EXPRESS_HTTPS = config.env("EXPRESS_HTTPS","false")==="true";
        const EXPRESS_KEY = config.env("EXPRESS_KEY") as string;
        const EXPRESS_CERT = config.env("EXPRESS_CERT") as string;
        const HTTPS_REDIRECT = config.env("HTTPS_REDIRECT","false")==="true";        
        const HTTP_PORT = parseInt(config.env("HTTP_PORT","8080")) || 8080;
        const HTTPS_PORT = parseInt(config.env("HTTPS_PORT","8443")) || 8443;

        let settings = Object.assign({http: EXPRESS_HTTP, port: HTTP_PORT, https: EXPRESS_HTTPS, https_port: HTTPS_PORT, key: EXPRESS_KEY, cert: EXPRESS_CERT, https_redirect: HTTPS_REDIRECT}, options);
        console.info("settings",settings);
        let httpsSettings = settings.https && settings.key && settings.key.trim().length>0 && settings.cert && settings.cert.trim().length>0;
        if(httpsSettings && settings.https_redirect) {
            app.enable('trust proxy');
            app.use(function(request, response, next) {
                if (process.env.NODE_ENV != 'development' && !request.secure) {
                    let found_port = false;
                    let host = request.headers.host;
                    if(host && host.indexOf(":")>0) {
                        host = host.substring(0,host.indexOf(":"));
                        found_port = true;
                    }
                    let url = 'https://' + host+(found_port?":"+settings.https_port:"") + request.url;
                    console.info("redirecting to",url);
                    return response.redirect(url);
                }        
                next();
            });
        }
        if(httpsSettings) {
            const https = require('https');
            const fs = require('fs');
            const keyFile = settings.key;
            const certFile = settings.cert;
            const httpsServer = https.createServer({
                key: fs.readFileSync(keyFile),
                cert: fs.readFileSync(certFile)
            }, app);
            httpsServer.listen(settings.https_port, () => {
                let addr = httpsServer.address() as AddressInfo;
                console.info("address",addr);
                const host = addr.address == "::" || addr.address == "0.0.0.0" ? "localhost" : addr.address;
                let port = addr.port;
                console.info("Server running at https://"+host+":"+port);
            });
        }
        if(httpsSettings && !settings.http) return app;
        const server : Server = app.listen(settings.port, function () {
            let addr = server.address() as AddressInfo;
            console.info("address",addr);
            const host = addr.address == "::" || addr.address == "0.0.0.0" ? "localhost" : addr.address;
            let port = addr.port;
            console.info("Server running at http://"+host+":"+port);
        }); 
        return app;
    }

}
