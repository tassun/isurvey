import { Request, Response } from 'express';
import { KnMetaInfo, KnContextInfo, KnLoggerInterface, KnUserInfo } from "../models/AssureAlias";
import { API_URL, BASE_URL, CDN_URL, META_INFO, RELEASE_VERSION, EXCEPT_LAUNCH_PATH, VALID_ACCESSOR } from "../utils/EnvironmentVariable";
import { KnUtility } from '../utils/KnUtility';
import { AuthenError } from '../models/AuthenError';
import { HTTP } from '../api/HTTP';
import { BaseSystem } from "./BaseSystem";
import { Responser } from '../utils/Responser';
import { VerifyError } from '../models/VerifyError';
import { AuthenToken } from '../libs/AuthenToken';
import { SigninHandler } from '../handlers/SigninHandler';

export class BaseRouter extends BaseSystem {
    public dir: string = process.cwd();
    
    constructor(dir?: string, logger?: KnLoggerInterface) {
        super(logger);
        if(dir) this.dir = dir;
    }
    
    public async createContext(req: Request, pid?: string) : Promise<KnContextInfo> {
        return this.buildContext(req,pid);
    }

    public buildContext(req: Request, pid?: string) : KnContextInfo {
        let params = {};
        const body = (req.body) ? req.body : {};
        Object.assign(params, body, req.query, req.params);
        let user = undefined;
        let session = (req as any).session;
        if(session && session.user) user = session.user;        
        return {params: params, meta: { headers: req.headers, session: session, user: user, req: req, pid: pid }};
    }

    public buildParams(ctx: KnContextInfo, data?: any, pager?: any, error?: any) {
        let meta = this.getMetaInfo(ctx);
        return { meta : meta, data: data, page: pager, error: error};
    }

    public async authorize(req: Request) : Promise<KnContextInfo> {
        let ctx = await this.createContext(req);
        if(ctx.meta.user) {
            return Promise.resolve(ctx);
        }
        if(ctx.meta.session && ctx.meta.session.user) {
            ctx.meta.user = ctx.meta.session.user;
            return Promise.resolve(ctx);
        }
        return Promise.resolve(ctx);
    }

    public getCurrentUserInfo(req: Request) : KnUserInfo | undefined {
        let session = (req as any).session;
        if(session && session.user) return session.user;
        return undefined;
    }
    
    public getMetaInfo(context?: any) : KnMetaInfo {
        return { 
            api_url: API_URL,
            base_url: BASE_URL, 
            cdn_url: CDN_URL, 
            language: KnUtility.getDefaultLanguage(context),
            version: RELEASE_VERSION,
            token_key: this.getTokenKey(context),
            info: META_INFO,
            user: context?.meta?.user
        };
    }

    public isExceptLaunchPath(req: any) : boolean {
        if(req && req.originalUrl && EXCEPT_LAUNCH_PATH) {
            let paths = EXCEPT_LAUNCH_PATH.split(",");
            for(let p of paths) {
                if(req.originalUrl.indexOf(p)>=0) {
                    return true;
                }
            }
        }
        return false;
    }

    public async validateLaunchPath(context: KnContextInfo) {
        if(this.isExceptLaunchPath(context.meta.req)) {
            return Promise.resolve();
        }
        return Promise.resolve();
    }

    public async validateLauncher(req: Request, res: Response, ctx: any) : Promise<boolean> {
        try {
            await this.validateUser(req,res);
        } catch(ex) {
            this.logger.error(this.constructor.name+".isValidateLauncher: error",ex);
            let info = this.getMetaInfo(ctx);
            res.render("pages/error",{error: ex, meta: info});
            return false;
        }
        return true;
    }

    protected getTokenFromUrl(originalUrl: string) : string {
        let token = "";
        const URL_LIST = ["/index/","/user/listalls/","/survey/add/","/survey/edit/"];
        for(let url of URL_LIST) {
            let index = originalUrl.indexOf(url);
            if(index>=0) {
                token = originalUrl.substring(index+url.length);
            }
        }
        return token;
    }   

    public async validateUser(req: Request, res: Response) : Promise<KnUserInfo | undefined> {
        let userInfo = this.getCurrentUserInfo(req);
        if(userInfo) {
            return Promise.resolve(userInfo);
        }
        let ctx = await this.createContext(req);
        let token = this.getTokenKey(ctx);
        this.logger.debug(this.constructor.name+".validateUser: token",token);
        if(!token) {
            token = this.getTokenFromUrl(req.originalUrl);
            this.logger.debug(this.constructor.name+".validateUser: getTokenFromUrl",token);
        }
        if(token && token.trim().length>0) {
            try {
                let tokenInfo = AuthenToken.verifyToken(token);
                this.logger.debug(this.constructor.name+".validateUser: tokenInfo",tokenInfo);
                if(tokenInfo) {
                    let handler = new SigninHandler(this.logger);
                    let user = await handler.getUserById(tokenInfo.userid);
                    if(user) {
                        this.bindUser(req,user);
                        return Promise.resolve(user);
                    }
                }
            } catch(ex) {
                this.logger.error(this.constructor.name+".validateUser: error",ex);
                return Promise.reject(new AuthenError("Unauthorized access or session expired",HTTP.UNAUTHORIZED,-11300));
            }
        }
        if(VALID_ACCESSOR) {
            return Promise.reject(new AuthenError("Unauthorized access or session expired",HTTP.UNAUTHORIZED,-11200));
        }
        return Promise.resolve(undefined);
    }

    public response(res: Response, reply: any) {
        res.json(reply);
    }

    public responseError(res: Response, err: any, method: string, model?: string): void {
        Responser.responseError(res, err, model?model:this.constructor.name, method);
    }

    public isRecordNotFound(err: any): boolean {
        if(err instanceof VerifyError) {
            let ve = err as VerifyError;
            if(ve.errno==-16004) { 
                return true;
            }
        }
        return false;
    }

    public responseErrorPage(res: Response, err: any, ctx?: KnContextInfo): void {
        let info = this.getMetaInfo(ctx);
        if(this.isRecordNotFound(err)) {
            res.render("pages/notinfo",{error: err, meta: info});
            return;
        }
        res.render("pages/error",{error: err, meta: info});
    }

    public sendError(res: Response, err: any, method: string, ctx?: KnContextInfo, model?: string): void {
        if(ctx && ctx.params.ajax == "true") {
            this.responseError(res,err,method,model);
            return;
        }
        this.responseErrorPage(res,err,ctx);
    }

    public bindUser(req: Request,user: KnUserInfo) {
        let usr = { ...user } as any;
        delete usr.password;
        (req as any).session.user = usr;
    }

    public unbindUser(req: Request) {
        let session = (req as any).session;
        if(session && session.hasOwnProperty('user')) delete session.user;
    }

    protected getUserToken(req: Request) : string | undefined {
        return req.headers["auth_token"] as string || req.headers["token_key"] as string;
    }

}
