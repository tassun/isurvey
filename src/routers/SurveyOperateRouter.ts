import { Application, Request, Response, Router } from 'express';
import { OperateRouter } from '../base/OperateRouter';
import { KnPageRender } from '../utils/KnPageRender';

export class SurveyOperateRouter extends OperateRouter {
    public progid : string = "";

	public async routeAdd(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeAdd",ctx);
		try {
			let handler = this.getHandler();
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.add(ctx);
                let pager = new KnPageRender(this.progid,ctx);
                let param = this.buildParams(ctx,rs,pager);
                this.logger.debug(this.constructor.name+".routeAdd",rs);
                res.render(this.progid+"/"+this.progid,param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
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
            if(handler && this.progid.trim().length>0) {
                let rs = await handler.edit(ctx);
                let pager = new KnPageRender(this.progid,ctx);
                let param = this.buildParams(ctx,rs,pager);
                this.logger.debug(this.constructor.name+".routeEdit",rs);
                res.render(this.progid+"/"+this.progid,param);
            } else {
                res.render("pages/noservice",{error:"Handler not found"});
            }
		} catch(ex) { 
			this.logger.error(this.constructor.name+".routeEdit",ex);
			this.sendError(res, ex, "edit", ctx);
		}
	}

	public async routeOpen(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		this.logger.debug(this.constructor.name+".routeOpen",ctx);
		let survey_id = ctx.params.survey_id;
		if(survey_id && survey_id.trim().length>0) {
			//ensure survey_id does not exist then go to add page
			try {
				let handler = this.getHandler();
                if(handler && this.progid.trim().length>0) {
                    let rs = await handler.edit(ctx);
                    let pager = new KnPageRender(this.progid,ctx);
                    let param = this.buildParams(ctx,rs,pager);
                    this.logger.debug(this.constructor.name+".routeOpen",rs);
                    res.render(this.progid+"/"+this.progid,param);
                } else {
                    res.render("pages/noservice",{error:"Handler not found"});
                }
			} catch(ex) { 
				this.logger.error(this.constructor.name+".routeOpen",ex);
				if(this.isRecordNotFound(ex)) {
					this.routeAdd(req,res);
					return;
				}
				this.sendError(res, ex, "open", ctx);
			}
		} else {
			this.routeAdd(req,res);
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
