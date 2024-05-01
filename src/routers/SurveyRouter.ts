import { Application, Request, Response, Router } from 'express';
import { OperateRouter } from '../base/OperateRouter';
import { SurveyProfileHandler } from '../handlers/SurveyProfileHandler';
import { KnPageRender } from '../utils/KnPageRender';
import { SurveyFormHandler } from '../handlers/SurveyFormHandler';

export class SurveyRouter extends OperateRouter {

	public override getHandler(): SurveyProfileHandler {
		return new SurveyProfileHandler(this.logger);
	}

	public async routeListAlls(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let param = this.buildParams(ctx);
			this.logger.debug(this.constructor.name+".routeListAlls",param);
			res.render("survey/survey_listalls",param);
		} catch(ex) { 
			this.sendError(res, ex, "listalls", ctx);
		}
	}

	public async routeAdd(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeAdd",ctx);
		try {
			let handler = this.getHandler();
			let rs = await handler.add(ctx);
			let pager = new KnPageRender("profile",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeAdd",rs);
			res.render("survey/survey_profile",param);
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeAdd",ex);
			this.sendError(res, ex, "add", ctx);
		}
	}

	public async routeEdit(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeEdit",ctx);
		try {
			let handler = this.getHandler();
			let rs = await handler.edit(ctx);
			let pager = new KnPageRender("profile",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeEdit",rs);
			res.render("survey/survey_profile",param);
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeEdit",ex);
			this.sendError(res, ex, "edit", ctx);
		}
	}

	public async routeForm(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeForm",ctx);
		try {
			let handler = new SurveyFormHandler(this.logger);
			let rs = await handler.catalog(ctx);
			let pager = new KnPageRender("form",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeForm",rs);
			res.render("survey/survey_form",param);
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeForm",ex);
			this.sendError(res, ex, "form", ctx);
		}
	}

	public override route(app: Application) : Router {
		super.route(app);
		//gui can post or get
		this.router.get('/listalls', async (req: Request, res: Response) => { this.routeListAlls(req,res); });
		this.router.post('/listalls', async (req: Request, res: Response) => { this.routeListAlls(req,res); });
		this.router.get('/add', async (req: Request, res: Response) => { this.routeAdd(req,res); });
		this.router.post('/add', async (req: Request, res: Response) => { this.routeAdd(req,res); });
		this.router.get('/edit', async (req: Request, res: Response) => { this.routeEdit(req,res); });
		this.router.post('/edit', async (req: Request, res: Response) => { this.routeEdit(req,res); });
		this.router.get('/edit/:profile_id', async (req: Request, res: Response) => { this.routeEdit(req,res); });
		this.router.get('/form', async (req: Request, res: Response) => { this.routeForm(req,res); });
		this.router.post('/form', async (req: Request, res: Response) => { this.routeForm(req,res); });
		this.router.get('/form/:profile_id', async (req: Request, res: Response) => { this.routeForm(req,res); });
		return this.router;
	}
	
}
