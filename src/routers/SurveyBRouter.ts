import { Application, Request, Response, Router } from 'express';
import { KnPageRender } from '../utils/KnPageRender';
import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyBHandler } from '../handlers/SurveyBHandler';
import { SurveyProfileHandler } from '../handlers/SurveyProfileHandler';
import { SurveyFamilyHandler } from '../handlers/SurveyFamilyHandler';

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

	public override async routeDataTable(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeDataTable",ctx);
		try {
			let handler = this.getHandler();
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.edit(ctx);
                let pager = new KnPageRender(this.progid,ctx);
                let param = this.buildParams(ctx,rs,pager);
                this.logger.debug(this.constructor.name+".routeDataTable",rs);
                res.render(this.progid+"/"+this.progid+"_table",param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeDataTable",ex);
			this.sendError(res, ex, "datatable", ctx);
		}
	}

	public async routeAddFamily(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeAddFamily",ctx);
		try {
			let handler = new SurveyFamilyHandler(this.logger);
			let rs = await handler.add(ctx);
			let pager = new KnPageRender("family",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeAddFamily",rs);
			res.render("survey_b/survey_family_dialog",param);
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeAddFamily",ex);
			this.sendError(res, ex, "add", ctx);
		}
	}

	public async routeEditFamily(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeEditFamily",ctx);
		try {
			let handler = new SurveyFamilyHandler(this.logger);
			let rs = await handler.edit(ctx);
			let pager = new KnPageRender("profile",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeEditFamily",rs);
			res.render("survey/survey_profile_dialog",param);
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeEditFamily",ex);
			this.sendError(res, ex, "edit", ctx);
		}
	}

	public async routeInsertFamily(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = new SurveyFamilyHandler(this.logger);
			let rs = await handler.insert(ctx);
			let reply = this.createJSONReply("insert",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "insert");
		}
	}

	public async routeUpdateFamily(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = new SurveyFamilyHandler(this.logger);
			let rs = await handler.update(ctx);
			let reply = this.createJSONReply("update",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "update");
		}
	}

	public override route(app: Application) : Router {
		super.route(app);
		this.router.get('/profile/add/:token_key?', async (req: Request, res: Response) => { this.routeAddProfile(req,res); });
		this.router.post('/profile/add/:token_key?', async (req: Request, res: Response) => { this.routeAddProfile(req,res); });
		this.router.get('/profile/edit/:token_key?', async (req: Request, res: Response) => { this.routeEditProfile(req,res); });
		this.router.post('/profile/edit/:token_key?', async (req: Request, res: Response) => { this.routeEditProfile(req,res); });
		this.router.get('/family/add/:token_key?', async (req: Request, res: Response) => { this.routeAddFamily(req,res); });
		this.router.post('/family/add/:token_key?', async (req: Request, res: Response) => { this.routeAddFamily(req,res); });
		this.router.get('/family/edit/:token_key?', async (req: Request, res: Response) => { this.routeEditFamily(req,res); });
		this.router.post('/family/edit/:token_key?', async (req: Request, res: Response) => { this.routeEditFamily(req,res); });
		this.router.get('/family/insert/:token_key?', async (req: Request, res: Response) => { this.routeInsertFamily(req,res); });
		this.router.post('/family/insert/:token_key?', async (req: Request, res: Response) => { this.routeInsertFamily(req,res); });
		this.router.get('/family/update/:token_key?', async (req: Request, res: Response) => { this.routeUpdateFamily(req,res); });
		this.router.post('/family/update/:token_key?', async (req: Request, res: Response) => { this.routeUpdateFamily(req,res); });
		return this.router;
	}

}
