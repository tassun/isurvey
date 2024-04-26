import { Application, Request, Response, Router } from 'express';
import { OperateRouter } from '../base/OperateRouter';
import { Survey1Handler } from '../handlers/Survey1Handler';
import { KnPageRender } from '../utils/KnPageRender';

export class Survey1Router extends OperateRouter {

	public override getHandler(): Survey1Handler {
		return new Survey1Handler(this.logger);
	}

	public async routeListAlls(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		ctx.params.action = "listalls";
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
		ctx.params.action = "add";
		this.logger.debug(this.constructor.name+".routeAdd",ctx);
		try {
			let handler = this.getHandler();
			let rs = await handler.add(ctx);
			let pager = new KnPageRender("survey1",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeAdd",rs);
			res.render("survey1/survey1",param);
		} catch(ex) { 
			this.sendError(res, ex, "add", ctx);
		}
	}

	public async routeEdit(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		ctx.params.action = "edit";
		this.logger.debug(this.constructor.name+".routeEdit",ctx);
		try {
			let handler = this.getHandler();
			let rs = await handler.edit(ctx);
			let pager = new KnPageRender("survey1",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeEdit",rs);
			res.render("survey1/survey1",param);
		} catch(ex) { 
			this.sendError(res, ex, "edit", ctx);
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
		return this.router;
	}
	
}
