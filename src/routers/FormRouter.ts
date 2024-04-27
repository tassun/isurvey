import { Application, Request, Response, Router } from 'express';
import { OperateRouter } from '../base/OperateRouter';
import { SurveyFormHandler } from '../handlers/SurveyFormHandler';

export class FormRouter extends OperateRouter {

	public override getHandler(): SurveyFormHandler {
		return new SurveyFormHandler(this.logger);
	}

    public async routeCatalog(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = this.getHandler();
			if(handler) {
				let rs = await handler.catalog(ctx);
				let reply = this.createJSONReply("catalog",rs);
				this.response(res,reply);
			} else {
				let reply = this.createJSONReply("catalog");
				this.response(res,reply);
			}
		} catch(ex) { 
			this.responseError(res, ex, "catalog");
		}
	}

    public override route(app: Application) : Router {
		this.router.post('/list', async (req: Request, res: Response) => { this.routeList(req,res); });
		this.router.post('/catalog', async (req: Request, res: Response) => { this.routeCatalog(req,res); });
		return this.router;
	}

}
