import { Request, Response } from 'express';
import { BaseRouter } from './BaseRouter';

export class RenderRouter extends BaseRouter {

    public async doLogin(req: Request, res: Response) {
        this.logger.debug(this.constructor.name+".doLogin : "+req.originalUrl);
        let ctx = await this.createContext(req);
        let param = this.buildParams(ctx);
        this.logger.debug("param",param);
        res.render('pages/login',param);
    }
     
    public async doMain(req: Request, res: Response) {
        this.logger.debug(this.constructor.name+".doMain : "+req.originalUrl);
        let ctx = await this.createContext(req);
        let param = this.buildParams(ctx);
        this.logger.debug("param",param);
        res.render('pages/main',param);
    }

    public async doIndex(req: Request, res: Response) {
        this.logger.debug(this.constructor.name+".doIndex : "+req.originalUrl);
        try {
            await this.validateUser(req,res);        
            let ctx = await this.createContext(req);
            let param = this.buildParams(ctx);
            this.logger.debug("param",param);
            res.render('pages/index',param);
        } catch(ex) { 
            this.logger.error(this.constructor.name+".doIndex: error",ex);
            this.doLogin(req,res);
        }
    }

}
