import { Application, Request, Response, Router } from 'express';
import { KnPageRender } from '../utils/KnPageRender';
import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyDXHandler } from '../handlers/SurveyDXHandler';

export class SurveyDXRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_dx";
	
	public override getHandler(): SurveyDXHandler {
		return new SurveyDXHandler(this.logger);
	}

	public async routeView(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeView",ctx);
		try {
			let handler = this.getHandler();
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.edit(ctx);
                let pager = new KnPageRender(this.progid,ctx);
                let param = this.buildParams(ctx,rs,pager);
                this.logger.debug(this.constructor.name+".routeView",rs);
                res.render(this.progid+"/"+this.progid+"_dialog",param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeView",ex);
			this.sendError(res, ex, "view", ctx);
		}
	}

	public async routeEntry(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeEntry",ctx);
		try {
			let handler = this.getHandler();
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.add(ctx);
                let pager = new KnPageRender(this.progid,ctx);
                let param = this.buildParams(ctx,rs,pager);
                this.logger.debug(this.constructor.name+".routeEntry",rs);
                res.render(this.progid+"/"+this.progid+"_dialog",param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeEntry",ex);
			this.sendError(res, ex, "entry", ctx);
		}
	}

	public override route(app: Application) : Router {
		super.route(app);
		this.router.get('/view/:token_key?', async (req: Request, res: Response) => { this.routeView(req,res); });
		this.router.post('/view/:token_key?', async (req: Request, res: Response) => { this.routeView(req,res); });
		this.router.get('/entry/:token_key?', async (req: Request, res: Response) => { this.routeEntry(req,res); });
		this.router.post('/entry/:token_key?', async (req: Request, res: Response) => { this.routeEntry(req,res); });
		return this.router;
	}

}
