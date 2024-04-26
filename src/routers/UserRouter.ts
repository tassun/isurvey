import { Application, Request, Response, Router } from 'express';
import { OperateRouter } from '../base/OperateRouter';
import { UserHandler } from '../handlers/UserHandler';

export class UserRouter extends OperateRouter {

	public override getHandler(): UserHandler {
		return new UserHandler(this.logger);
	}

	public async routeListAlls(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		ctx.params.action = "listalls";
		try {
			let param = this.buildParams(ctx);
			this.logger.debug(this.constructor.name+".routeListAlls",param);
			res.render("user/user_listalls",param);
		} catch(ex) { 
			this.sendError(res, ex, "listalls", ctx);
		}
	}

	public override route(app: Application) : Router {
		super.route(app);
		//gui can post or get
		this.router.get('/listalls', async (req: Request, res: Response) => { this.routeListAlls(req,res); });
		this.router.post('/listalls', async (req: Request, res: Response) => { this.routeListAlls(req,res); });
		return this.router;
	}
	
}
