import express from 'express';
import { Application, Request, Response, Router } from 'express';
import { BaseRouter } from '../base/BaseRouter';
import { HTTP } from '../api/HTTP';
import { AuthenError } from '../models/AuthenError';
import { KnUserInfo } from '../models/AssureAlias';
import { SigninHandler } from '../handlers/SigninHandler';

const router = express.Router();
export class SigninRouter extends BaseRouter {

	public getHandler(): SigninHandler {
		return new SigninHandler(this.logger);
	}

	public async routeSignin(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let reply = await this.getHandler().signin(ctx);
			if(reply.head.errorflag=="N") {
				let userInfo = { ...reply.body };
				this.bindUser(req,userInfo as KnUserInfo);
				this.response(res,reply);
			} else {
				let errmsg = reply.head.errordesc;
				throw new AuthenError(errmsg,HTTP.UNAUTHORIZED,Number(reply.head.errorcode));
			}
		} catch(ex) { 
			this.responseError(res, ex, "signin");
		}
	}

	public async routeSignout(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			this.unbindUser(req);
			let userInfo = this.getCurrentUserInfo(req);
			this.logger.debug(this.constructor.name+".signout :",userInfo);
			if(userInfo) {
				ctx.params.useruuid = userInfo.userid;
				let reply = await this.getHandler().signout(ctx);
				if(reply.head.errorflag=="N") {
					this.response(res,reply);
				} else {
					let errmsg = reply.head.errordesc;
					throw new AuthenError(errmsg,HTTP.UNAUTHORIZED,Number(reply.head.errorcode));
				}
			} else {
				let reply = this.createJSONReply("signout");
				this.response(res,reply);
			}
		} catch(ex) {
			this.responseError(res, ex, "signout");
		}
	}

	public async routeLogin(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let token = this.getUserToken(req);
			let reply = await this.getHandler().signin(ctx);
			if(reply.head.errorflag=="N") {
				let userInfo = { ...reply.body } as KnUserInfo;
				this.bindUser(req,userInfo);
				token = userInfo.token;
			} else {
				let errmsg = reply.head.errordesc;
				throw new AuthenError(errmsg,HTTP.UNAUTHORIZED,Number(reply.head.errorcode));
			}
			res.redirect('/index'+(token?"/"+token:""));
		} catch(ex) { 
			res.redirect('/login');
		}
	}

	public route(app: Application) : Router {
		router.post('/signin', async (req: Request, res: Response) => { this.routeSignin(req,res); });
		router.post('/signout', async (req: Request, res: Response) => { this.routeSignout(req,res); });
		router.post('/login', async (req: Request, res: Response) => { this.routeLogin(req,res); });
		return router;
	}

}
