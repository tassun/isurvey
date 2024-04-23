import { KnDBConnector } from 'will-sql';
import { JSONReply } from '../api/JSONReply';
import { KnContextInfo, KnSigninInfo } from '../models/AssureAlias';
import { BaseHandler } from './BaseHandler';

export class SigninHandler extends BaseHandler {

    public async signin(context: KnContextInfo) : Promise<JSONReply> {
        return this.doSignin(context);
	}

    protected getSigninInfo(context: KnContextInfo) : KnSigninInfo {
        return { username: context.params.username, password: context.params.password, site: context.params.site };
    }

    protected async doSignin(context: KnContextInfo) : Promise<JSONReply> {
        let signinfo = this.getSigninInfo(context);
        this.logger.debug(this.constructor.name+".doSignin : username="+signinfo.username);
        let db = this.getPrivateConnector();
        try {    
            return await this.processSignin(context, signinfo, db);
        } catch(ex: any) {
            this.logger.error(this.constructor.name,ex);
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    public async processSignin(context: KnContextInfo, signinfo: KnSigninInfo, db: KnDBConnector) : Promise<JSONReply> {
        let pname = signinfo.username;
        let ppass = signinfo.password;
        let response: JSONReply = new JSONReply();
        response.head.modeling("signin","signin");
        response.head.composeNoError();
        let body = {};
        let userInfo = await this.getUserInfo(db, pname);
        let passed = true;
        if(userInfo) {
            if(passed) {
                let ismatch = userInfo.password == ppass;
                if(!ismatch) {
                    passed = false;
                    response.head.composeError("-3002","Invalid user or password");
                } else {
                    body = { ...userInfo };
                }
            }
        } else {
            passed = false;
            response.head.composeError("-3003","Invalid user or password");
        }
        response.body = body;
        return Promise.resolve(response);
    }

    public async signout(context: KnContextInfo) : Promise<JSONReply> {
        return this.doSignout(context);
	}

    protected async doSignout(context: KnContextInfo) : Promise<JSONReply> {
        let puuid = context.params.useruuid;
        this.logger.debug(this.constructor.name+".doSignout : useruuid = "+puuid);
        return await this.processSignout(undefined, puuid);
        //if handle data in database when log out use this code
        /*
        let db = this.getPrivateConnector();
        try {
            return await this.processSignout(db, puuid);
        } catch(ex: any) {
            this.logger.error(this.constructor.name,ex);
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }*/
    }

    public async processSignout(db: KnDBConnector|undefined, useruuid: string) : Promise<JSONReply> {
        let response: JSONReply = new JSONReply();
        response.head.modeling("signout","signout");
        response.head.composeNoError();
        let body : Map<string,string> = new Map();
        response.body = Object.fromEntries(body);
        return Promise.resolve(response);
    }

}
