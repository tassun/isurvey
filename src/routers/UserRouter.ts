import express from 'express';
import { Application, Request, Response, Router } from 'express';
import { BaseRouter } from './BaseRouter';
import { UserHandler } from '../handlers/UserHandler';

const router = express.Router();
export class UserRouter extends BaseRouter {
	public async routeInsert(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = new UserHandler(this.logger);
			let rs = await handler.insert(ctx);
			let reply = this.createJSONReply("insert",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "insert");
		}
	}
	public async routeRetrieve(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = new UserHandler(this.logger);
			let rs = await handler.retrieve(ctx);
			let reply = this.createJSONReply("retrieve",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "retrieve");
		}
	}
	public async routeUpdate(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = new UserHandler(this.logger);
			let rs = await handler.update(ctx);
			let reply = this.createJSONReply("update",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "update");
		}
	}
	public async routeRemove(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = new UserHandler(this.logger);
			let rs = await handler.remove(ctx);
			let reply = this.createJSONReply("remove",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "remove");
		}
	}
	public async routeList(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = new UserHandler(this.logger);
			let rs = await handler.list(ctx);
			let reply = this.createJSONReply("list",rs);
			this.response(res,reply);
		} catch(ex) { 
			this.responseError(res, ex, "list");
		}
	}
	public async routeListAlls(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let param = this.buildParams(ctx);
			this.logger.debug("param",param);
			res.render('user/listalls',param);
		} catch(ex) { 
			this.sendError(res, ex, "listalls", ctx);
		}
	}
	public route(app: Application) : Router {
		//api accept only post
		router.post('/insert', async (req: Request, res: Response) => { this.routeInsert(req,res); });
		router.post('/retrieve', async (req: Request, res: Response) => { this.routeRetrieve(req,res); });
		router.post('/update', async (req: Request, res: Response) => { this.routeUpdate(req,res); });
		router.post('/remove', async (req: Request, res: Response) => { this.routeRemove(req,res); });
		router.post('/list', async (req: Request, res: Response) => { this.routeList(req,res); });
		//gui can post or get
		router.get('/listalls', async (req: Request, res: Response) => { this.routeListAlls(req,res); });
		router.post('/listalls', async (req: Request, res: Response) => { this.routeListAlls(req,res); });
		return router;
	}
}
