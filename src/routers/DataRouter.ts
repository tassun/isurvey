import { OperateRouter } from "../base/OperateRouter";
import { Application, Request, Response, Router } from 'express';
import { DataHandler } from "../base/DataHandler";

export class DataRouter extends OperateRouter {

	public override getHandler(): DataHandler {
		return new DataHandler(this.logger);
	}

	public async routeCategory(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = this.getHandler();
			let rs = await handler.category(ctx);
			let reply = this.createJSONReply("category",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "category");
		}
	}

	public async routeCategories(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = this.getHandler();
			let rs = await handler.categories(ctx);
			let reply = this.createJSONReply("categories",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "categories");
		}
	}

	public async routeCategorize(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = this.getHandler();
			let rs = await handler.categorize(ctx);
			let reply = this.createJSONReply("categorize",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "categorize");
		}
	}

    public override route(app: Application) : Router {
		this.router.post('/category/:token_key?', async (req: Request, res: Response) => { this.routeCategory(req,res); });
		this.router.get('/category/:token_key?', async (req: Request, res: Response) => { this.routeCategory(req,res); });
		this.router.post('/categories/:token_key?', async (req: Request, res: Response) => { this.routeCategories(req,res); });
		this.router.get('/categories/:token_key?', async (req: Request, res: Response) => { this.routeCategories(req,res); });
		this.router.post('/categorize/:token_key?', async (req: Request, res: Response) => { this.routeCategorize(req,res); });
		this.router.get('/categorize/:token_key?', async (req: Request, res: Response) => { this.routeCategorize(req,res); });
        return this.router;
    }

}
