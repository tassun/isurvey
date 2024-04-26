import { Application, Request, Response } from 'express';
import { Utilities } from 'will-util';
import { BaseRouter } from '../base/BaseRouter';
import { RenderRouter } from './RenderRouter';
import { SigninRouter } from './SigninRouter';
import { TestRouter } from './TestRouter';
import { UserRouter } from './UserRouter';
import { ExportRouter } from './ExportRouter';
import { DataRouter } from './DataRouter';
import { Survey1Router } from './Survey1Router';

const errorHandler = require('express-error-handler');
export class RouteManager extends BaseRouter {

    private doHome(req: Request, res: Response,) {
        this.logger.debug(this.constructor.name+':working '+this.dir+' - send /public/home.html');
        let parent = Utilities.getWorkingDir(this.dir); 
        this.logger.debug(this.constructor.name+":parent path : "+parent);
        let ctx = this.buildContext(req);
        this.logger.debug(this.constructor.name+":context : ",ctx);
        res.sendFile(parent + '/public/home.html');        
    }

    private doWelcome(req: Request, res: Response) {
        this.logger.debug(this.constructor.name+':working '+this.dir+' - send /public/welcome.html');
        let parent = Utilities.getWorkingDir(this.dir as string); 
        this.logger.debug(this.constructor.name+":parent path : "+parent);
        let ctx = this.buildContext(req);
        this.logger.debug(this.constructor.name+":context : ",ctx);
        res.sendFile(parent + '/public/welcome.html');
    }    

    private async doValidate(req: Request, res: Response, next: Function) {
        try {
            await this.validateUser(req,res);
        } catch(ex:any) { 
            this.logger.error(this.constructor.name+".route: error",ex);
            let ctx = this.buildContext(req);
            if(ctx.params.ajax=="true") {
                this.responseError(res,ex,"user");
                return;
            }
            //let render = new RenderRouter(this.dir,this.logger);
            //render.doLogin(req,res);
            res.redirect('/login');
            return;
        }
        next();
    }

    private handleErrors(app: Application) {
        const handleError = errorHandler({
            views: {
              404: 'pages/notfound',
              500: 'pages/servererror'
            }
        });
        app.use(errorHandler.httpError(404));
        app.use(handleError);    
    }

    public route(app: Application, dir?: string) {
        if(dir) this.dir = dir;
        let render = new RenderRouter(this.dir,this.logger);
        let signin = new SigninRouter(this.dir,this.logger);
        let user = new UserRouter(this.dir,this.logger);
        let exporter = new ExportRouter(this.dir,this.logger);
        let data = new DataRouter(this.dir,this.logger);
        let survey = new Survey1Router(this.dir,this.logger);

        app.use(async (req: Request, res: Response, next: Function) => {
            try {
                this.logger.debug(this.constructor.name+".route: url="+req.originalUrl);
                this.logger.debug(this.constructor.name+".route: headers",req.headers);
            } catch(ex) { }
            next();
        });
        new TestRouter(this.dir,this.logger).route(app);        

        app.get("/", (req: Request, res: Response) => { this.doHome(req,res); });
        app.get('/home', (req: Request, res: Response) => { this.doHome(req,res); });  
        app.get('/welcome', (req: Request, res: Response) => { this.doWelcome(req,res); });  

        app.get('/main', (req: Request, res: Response) => { render.doMain(req,res); });
        app.get('/login', (req: Request, res: Response) => { render.doLogin(req,res); });
        app.use("/signin", signin.route(app));

        app.use(async (req: Request, res: Response, next: Function) => { this.doValidate(req,res,next); });

        app.get('/index', (req: Request, res: Response) => { render.doIndex(req,res); });        
        app.use("/user", user.route(app));
        app.use("/export", exporter.route(app));
        app.use("/data", data.route(app));
        app.use("/survey", survey.route(app));

        this.handleErrors(app);
    }
}
