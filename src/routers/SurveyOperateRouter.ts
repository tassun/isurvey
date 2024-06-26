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
			this.sendError(res, ex, "listing", ctx);
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
                res.render(this.progid+"/"+this.progid+"_table",param);
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
		//gui can post or get
		this.router.get('/add/:token_key?', async (req: Request, res: Response) => { this.routeAdd(req,res); });
		this.router.post('/add/:token_key?', async (req: Request, res: Response) => { this.routeAdd(req,res); });
		this.router.get('/edit/:token_key?', async (req: Request, res: Response) => { this.routeEdit(req,res); });
		this.router.post('/edit/:token_key?', async (req: Request, res: Response) => { this.routeEdit(req,res); });
		this.router.get('/open/:token_key?', async (req: Request, res: Response) => { this.routeOpen(req,res); });
		this.router.post('/open/:token_key?', async (req: Request, res: Response) => { this.routeOpen(req,res); });
		this.router.get('/listing/:token_key?', async (req: Request, res: Response) => { this.routeListing(req,res); });
		this.router.post('/listing/:token_key?', async (req: Request, res: Response) => { this.routeListing(req,res); });
		this.router.get('/datatable/:token_key?', async (req: Request, res: Response) => { this.routeDataTable(req,res); });
		this.router.post('/datatable/:token_key?', async (req: Request, res: Response) => { this.routeDataTable(req,res); });
		return this.router;
	}
	
}
