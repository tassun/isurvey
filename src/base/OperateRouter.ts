import express from 'express';
import { Application, Request, Response, Router } from 'express';
import { BaseRouter } from './BaseRouter';
import { ProcessHandler } from './ProcessHandler';

export class OperateRouter extends BaseRouter {
	public router = express.Router();

	public getHandler(): ProcessHandler | undefined {
		return undefined
	}

	public async routeInsert(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = this.getHandler();
			if(handler) {
				let rs = await handler.insert(ctx);
				let reply = this.createJSONReply("insert",rs);
				this.response(res,reply);
			} else {
				let reply = this.createJSONReply("insert");
				reply.head.composeError("4004","Handler not found");
				this.response(res,reply);
			}
		} catch(ex) { 
			this.responseError(res, ex, "insert");
		}
	}

	public async routeRetrieve(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = this.getHandler();
			if(handler) {
				let rs = await handler.retrieve(ctx);
				let reply = this.createJSONReply("retrieve",rs);
				this.response(res,reply);
			} else {
				let reply = this.createJSONReply("retrieve");
				reply.head.composeError("4004","Handler not found");
				this.response(res,reply);
			}
		} catch(ex) { 
			this.responseError(res, ex, "retrieve");
		}
	}

	public async routeUpdate(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = this.getHandler();
			if(handler) {
				let rs = await handler.update(ctx);
				let reply = this.createJSONReply("update",rs);
				this.response(res,reply);
			} else {
				let reply = this.createJSONReply("update");
				reply.head.composeError("4004","Handler not found");
				this.response(res,reply);
			}
		} catch(ex) { 
			this.responseError(res, ex, "update");
		}
	}

	public async routeRemove(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = this.getHandler();
			if(handler) {
				let rs = await handler.remove(ctx);
				let reply = this.createJSONReply("remove",rs);
				this.response(res,reply);
			} else {
				let reply = this.createJSONReply("remove");
				reply.head.composeError("4004","Handler not found");
				this.response(res,reply);
			}
		} catch(ex) { 
			this.responseError(res, ex, "remove");
		}
	}

	public async routeList(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let handler = this.getHandler();
			if(handler) {
				let rs = await handler.list(ctx);
				let reply = this.createJSONReply("list",rs);
				this.response(res,reply);
			} else {
				let reply = this.createJSONReply("list");
				reply.head.composeError("4004","Handler not found");
				this.response(res,reply);
			}
		} catch(ex) { 
			this.responseError(res, ex, "list");
		}
	}

	public route(app: Application) : Router {
		//api accept only post
		this.router.post('/insert/:token_key?', async (req: Request, res: Response) => { this.routeInsert(req,res); });
		this.router.post('/retrieve/:token_key?', async (req: Request, res: Response) => { this.routeRetrieve(req,res); });
		this.router.post('/update/:token_key?', async (req: Request, res: Response) => { this.routeUpdate(req,res); });
		this.router.post('/remove/:token_key?', async (req: Request, res: Response) => { this.routeRemove(req,res); });
		this.router.post('/list/:token_key?', async (req: Request, res: Response) => { this.routeList(req,res); });
		return this.router;
	}

}
