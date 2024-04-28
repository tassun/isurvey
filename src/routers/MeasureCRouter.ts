import { Application, Request, Response, Router } from 'express';
import { OperateRouter } from '../base/OperateRouter';
import { MeasureCHandler } from '../handlers/MeasureCHandler';
import { KnPageRender } from '../utils/KnPageRender';

export class MeasureCRouter extends OperateRouter {

	public override getHandler(): MeasureCHandler {
		return new MeasureCHandler(this.logger);
	}

	public async routeOpen(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeOpen",ctx);
		let survey_id = ctx.params.survey_id;
		if(survey_id && survey_id.trim().length>0) {
			this.routeEdit(req,res);
		} else {
			this.routeAdd(req,res);
		}
	}

	public async routeAdd(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeAdd",ctx);
		try {
			let handler = this.getHandler();
			let rs = await handler.add(ctx);
			let pager = new KnPageRender("measure_c",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeAdd",rs);
			res.render("measure_c/measure_c",param);
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
			let pager = new KnPageRender("measure_c",ctx);
			let param = this.buildParams(ctx,rs,pager);
			this.logger.debug(this.constructor.name+".routeEdit",rs);
			res.render("measure_c/measure_c",param);
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeEdit",ex);
			this.sendError(res, ex, "edit", ctx);
		}
	}

	public override route(app: Application) : Router {
		super.route(app);
		//gui can post or get
		this.router.get('/add', async (req: Request, res: Response) => { this.routeAdd(req,res); });
		this.router.post('/add', async (req: Request, res: Response) => { this.routeAdd(req,res); });
		this.router.get('/edit', async (req: Request, res: Response) => { this.routeEdit(req,res); });
		this.router.post('/edit', async (req: Request, res: Response) => { this.routeEdit(req,res); });
		this.router.get('/open', async (req: Request, res: Response) => { this.routeOpen(req,res); });
		this.router.post('/open', async (req: Request, res: Response) => { this.routeOpen(req,res); });
		return this.router;
	}
	
}
