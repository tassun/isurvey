import { Application, Request, Response, Router } from 'express';
import { KnPageRender } from '../utils/KnPageRender';
import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyBHandler } from '../handlers/SurveyBHandler';
import { SurveyProfileHandler } from '../handlers/SurveyProfileHandler';

export class SurveyBRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_b";
	
	public override getHandler(): SurveyBHandler {
		return new SurveyBHandler(this.logger);
	}

	public async routeAddProfile(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeAddProfile",ctx);
		try {
			let handler = new SurveyProfileHandler(this.logger);
			let rs = await handler.add(ctx);
			let pager = new KnPageRender("profile",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeAddProfile",rs);
			res.render("survey/survey_profile_dialog",param);
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeAddProfile",ex);
			this.sendError(res, ex, "add", ctx);
		}
	}

	public async routeEditProfile(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeEditProfile",ctx);
		try {
			let handler = new SurveyProfileHandler(this.logger);
			let rs = await handler.edit(ctx);
			let pager = new KnPageRender("profile",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeEditProfile",rs);
			res.render("survey/survey_profile_dialog",param);
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeEditProfile",ex);
			this.sendError(res, ex, "edit", ctx);
		}
	}

	public async routeDataTable(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeDataTable",ctx);
		try {
			let handler = this.getHandler();
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.edit(ctx);
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
		super.route(app);
		this.router.get('/profile/add', async (req: Request, res: Response) => { this.routeAddProfile(req,res); });
		this.router.post('/profile/add', async (req: Request, res: Response) => { this.routeAddProfile(req,res); });
		this.router.get('/profile/edit', async (req: Request, res: Response) => { this.routeEditProfile(req,res); });
		this.router.post('/profile/edit', async (req: Request, res: Response) => { this.routeEditProfile(req,res); });
		this.router.get('/datatable', async (req: Request, res: Response) => { this.routeDataTable(req,res); });
		this.router.post('/datatable', async (req: Request, res: Response) => { this.routeDataTable(req,res); });		
		return this.router;
	}

}
