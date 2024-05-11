import os from "os";
import { KnResultSet, KnDBConnector, KnRecordSet, KnDBConfig, KnDBConnections, KnDBError } from 'will-sql';
import { VerifyError } from "../models/VerifyError";
import { KnContextInfo, KnValidateInfo } from "../models/AssureAlias";
import { JSONReply } from "../api/JSONReply";
import { HTTP } from "../api/HTTP";
import { DB_SECTION } from "../utils/EnvironmentVariable";
import { Utilities } from "will-util";
import { BaseSystem } from "./BaseSystem";
import { UserTokenInfo } from "../libs/AuthenToken";
import { AuthenToken } from "../libs/AuthenToken";

export class BaseHandler extends BaseSystem {
    public section: string = DB_SECTION;
    
    protected getTokenInfo(context: KnContextInfo) : UserTokenInfo | undefined {
        let token = this.getTokenKey(context);
        if(token) {
            try {
                return AuthenToken.verifyToken(token, false);
            } catch(ex) {
                this.logger.error(this.constructor.name+".getTokenInfo",ex);            
            }
        }
        return undefined;
    }

    protected getHeaderParameter(context: KnContextInfo, parameterName: string) : string | undefined {
        let result = undefined;
        if(context) {     
            if(context.meta.headers) {
                result = context.meta.headers[parameterName];
            }
            if(context.params && context.params.req) {
                result = context.params.req.headers[parameterName];
            }
            if(context.options && context.options.parentCtx && context.options.parentCtx.params && context.options.parentCtx.params.req) {
                result = context.options.parentCtx.params.req.headers[parameterName];
            }
        }        
        return result;
    }

    protected getPrivateConnector(section: string = this.section): KnDBConnector {
        return this.getConnector(section);
    }   

    public getCurrentUser() : string {
        return os.userInfo().username;
    }

    public getConnector(schema: string | KnDBConfig) : KnDBConnector {
        return KnDBConnections.getDBConnector(schema);
    }
     
    public getSQLError(err: any) : string {
        if(Utilities.isString(err)) return err;
        let msg = err.sqlMessage?err.sqlMessage:err.message;            
        return msg?msg:"SQL error";
    }

    public getDBError(err: any, code: number = -31000) : KnDBError | VerifyError {
        if(err instanceof VerifyError) return err;
        if(err instanceof KnDBError) return err;
        return new KnDBError(this.getSQLError(err),code);
    }

    public createJSONReply(method: string, data?: any, model?: string) : JSONReply {
        let reply : JSONReply = new JSONReply();
        reply.head.modeling(model?model:this.constructor.name, method);
        reply.head.composeNoError();
        reply.body = data;
        return reply;
    }

    public recordNotFound() : Promise<any> {
        return Promise.reject(new VerifyError("Record not found",HTTP.NOT_FOUND,-16004));
    }
    
    public notImplementation() : Promise<any> {
        return Promise.reject(new VerifyError("Not implemented",HTTP.NOT_IMPLEMENTED,-16005));
    }
    
    public createRecordSet(result: KnResultSet = {rows: [], columns: null}) : KnRecordSet {
        let records = 0;
        if(result.rows) {
            if(Array.isArray(result.rows)) {
                records = result.rows.length;
            } else {
                if(result.rows.affectedRows) {
                    records = result.rows.affectedRows;
                }
            }
        } 
        return {records: records, rows: result.rows, columns: null, offsets: result.offsets };
    }
    
    public validateParameters(params: any, ...args: string[]) : KnValidateInfo {
        if(args && args.length>0) {
            for(let i=0,isz=args.length;i<isz;i++) {
                let name = args[i];
                let value = params[name];
                if(value==undefined || value==null || value=="") {
                    return {valid:false, info: name};
                }
            }
        }
        return {valid: true};
    }

}
