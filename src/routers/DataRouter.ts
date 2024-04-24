import express from 'express';
import { BaseRouter } from "./BaseRouter";
import { Application, Request, Response, Router } from 'express';
import { DataHandler } from "../base/DataHandler";

const router = express.Router();
export class DataRouter extends BaseRouter {
	public async routeCategory(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = new DataHandler(this.logger);
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
			let handler = new DataHandler(this.logger);
			let rs = await handler.categories(ctx);
			let reply = this.createJSONReply("categories",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "categories");
		}
	}
    public route(app: Application) : Router {
		router.post('/category', async (req: Request, res: Response) => { this.routeCategory(req,res); });
		router.get('/category', async (req: Request, res: Response) => { this.routeCategory(req,res); });
		router.post('/categories', async (req: Request, res: Response) => { this.routeCategories(req,res); });
		router.get('/categories', async (req: Request, res: Response) => { this.routeCategories(req,res); });
        return router;
    }
}
