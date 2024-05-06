import { Application, Request, Response, Router } from 'express';
import { KnPageRender } from '../utils/KnPageRender';
import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyBXHandler } from '../handlers/SurveyBXHandler';

export class SurveyBXRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_bx";
	
	public override getHandler(): SurveyBXHandler {
		return new SurveyBXHandler(this.logger);
	}

	public async routeOpen(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeOpen",ctx);
		try {
			let handler = this.getHandler();
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.listing(ctx);
                let pager = new KnPageRender(this.progid,ctx);
                let param = this.buildParams(ctx,rs,pager);
                this.logger.debug(this.constructor.name+".routeOpen",rs);
                res.render(this.progid+"/"+this.progid,param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeOpen",ex);
			this.sendError(res, ex, "open", ctx);
		}
	}

	public async routeDataTable(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeDataTable",ctx);
		try {
			let handler = this.getHandler();
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.listing(ctx);
                let pager = new KnPageRender(this.progid,ctx);
                let param = this.buildParams(ctx,rs,pager);
                this.logger.debug(this.constructor.name+".routeDataTable",rs);
                res.render(this.progid+"/"+this.progid+"_kit",param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeDataTable",ex);
			this.sendError(res, ex, "datatable", ctx);
		}
	}

	public override route(app: Application) : Router {
		this.router.get('/open', async (req: Request, res: Response) => { this.routeOpen(req,res); });
		this.router.post('/open', async (req: Request, res: Response) => { this.routeOpen(req,res); });		
		this.router.get('/datatable', async (req: Request, res: Response) => { this.routeDataTable(req,res); });
		this.router.post('/datatable', async (req: Request, res: Response) => { this.routeDataTable(req,res); });		
		return this.router;
	}

}
