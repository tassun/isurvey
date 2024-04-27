import { Request, Response } from 'express';
import { KnMetaInfo, KnContextInfo, KnLoggerInterface, KnUserInfo } from "../models/AssureAlias";
import { API_URL, BASE_URL, CDN_URL, META_INFO, RELEASE_VERSION, EXCEPT_LAUNCH_PATH, VALID_ACCESSOR } from "../utils/EnvironmentVariable";
import { KnUtility } from '../utils/KnUtility';
import { AuthenError } from '../models/AuthenError';
import { HTTP } from '../api/HTTP';
import { BaseSystem } from "./BaseSystem";
import { Responser } from '../utils/Responser';
import { VerifyError } from '../models/VerifyError';

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

    public async validateUser(req: Request, res: Response) : Promise<KnUserInfo | undefined> {
        let userInfo = this.getCurrentUserInfo(req);
        if(userInfo) {
            return Promise.resolve(userInfo);
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

    public responseErrorPage(res: Response, err: any, ctx?: KnContextInfo): void {
        let info = this.getMetaInfo(ctx);
        if(err instanceof VerifyError) {
            let ve = err as VerifyError;
            if(ve.errno==-16004) { 
                //record not found
                res.render("pages/notinfo",{error: err, meta: info});
                return;            
            }
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

}
