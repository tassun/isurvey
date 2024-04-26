import { Request, Response } from 'express';
import { BaseRouter } from '../base/BaseRouter';

export class RenderRouter extends BaseRouter {

    public async doLogin(req: Request, res: Response) {
        this.logger.debug(this.constructor.name+".doLogin: url",req.originalUrl);
        let ctx = await this.createContext(req);
        let param = this.buildParams(ctx);
        this.logger.debug(this.constructor.name+"doLogin",param);
        res.render('pages/login',param);
    }
     
    public async doMain(req: Request, res: Response) {
        this.logger.debug(this.constructor.name+".doMain: url",req.originalUrl);
        let ctx = await this.createContext(req);
        let param = this.buildParams(ctx);
        this.logger.debug(this.constructor.name+"doMain",param);
        res.render("pages/main",param);
    }

    public async doIndex(req: Request, res: Response) {
        this.logger.debug(this.constructor.name+".doIndex: url",req.originalUrl);
        try {
            await this.validateUser(req,res);        
            let ctx = await this.createContext(req);
            let param = this.buildParams(ctx);
            this.logger.debug(this.constructor.name+"doIndex",param);
            res.render("pages/index",param);
        } catch(ex) { 
            this.logger.error(this.constructor.name+".doIndex: error",ex);
            this.doLogin(req,res);
        }
    }

}
