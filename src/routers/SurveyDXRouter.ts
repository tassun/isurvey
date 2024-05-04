import { Application, Request, Response, Router } from 'express';
import { KnPageRender } from '../utils/KnPageRender';
import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyDXHandler } from '../handlers/SurveyDXHandler';

export class SurveyDXRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_dx";
	
	public override getHandler(): SurveyDXHandler {
		return new SurveyDXHandler(this.logger);
	}

	public async routeListing(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeListing",ctx);
		try {
			let handler = this.getHandler();
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.listing(ctx);
                let pager = new KnPageRender(this.progid,ctx);
                let param = this.buildParams(ctx,rs,pager);
                this.logger.debug(this.constructor.name+".routeListing",rs);
                res.render(this.progid+"/"+this.progid+"_listing",param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeListing",ex);
			this.sendError(res, ex, "add", ctx);
		}
	}

	public async routeDialog(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeDialog",ctx);
		try {
			let handler = this.getHandler();
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.edit(ctx);
                let pager = new KnPageRender(this.progid,ctx);
                let param = this.buildParams(ctx,rs,pager);
                this.logger.debug(this.constructor.name+".routeDialog",rs);
                res.render(this.progid+"/"+this.progid+"_dialog",param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeDialog",ex);
			this.sendError(res, ex, "add", ctx);
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
                res.render(this.progid+"/"+this.progid+"_listing_kit",param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeDataTable",ex);
			this.sendError(res, ex, "add", ctx);
		}
	}

	public override route(app: Application) : Router {
		super.route(app);
		this.router.get('/listing', async (req: Request, res: Response) => { this.routeListing(req,res); });
		this.router.post('/listing', async (req: Request, res: Response) => { this.routeListing(req,res); });
		this.router.get('/dialog', async (req: Request, res: Response) => { this.routeDialog(req,res); });
		this.router.post('/dialog', async (req: Request, res: Response) => { this.routeDialog(req,res); });
		this.router.get('/datatable', async (req: Request, res: Response) => { this.routeDataTable(req,res); });
		this.router.post('/datatable', async (req: Request, res: Response) => { this.routeDataTable(req,res); });
		return this.router;
	}

}
