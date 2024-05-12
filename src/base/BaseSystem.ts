import { KnLoggerInterface, KnContextInfo } from "../models/AssureAlias";
import { KnLogger } from "../utils/KnLogger";
import { JSONReply } from "../api/JSONReply";

export abstract class BaseSystem {
    public readonly logger: KnLoggerInterface = new KnLogger();

    constructor(logger?: KnLoggerInterface) {
        if(logger) this.logger = logger;
    }

    public createJSONReply(method: string, data?: any, model?: string) : JSONReply {
        let reply : JSONReply = new JSONReply();
        reply.head.modeling(model?model:this.constructor.name, method);
        reply.head.composeNoError();
        reply.body = data;
        return reply;
    }
    
    public getTokenKey(context: KnContextInfo) : string | undefined {
        let token = undefined;   
        if(context) {     
            if(context.meta.headers) {
                token = context.meta.headers.auth_token || context.meta.headers.token_key;
                if(token) return token;
            }
            if(context.params && context.params.req) {
                token = context.params.req.headers.auth_token || context.params.req.headers.token_key;
                if(token) return token;
            }
            if(context.meta.user) {
                token = context.meta.user.token;
                if(token) return token;
            }
            if(context.params) {
                token = context.params.auth_token || context.params.token_key;
                if(token) return token;
            }
        }
        return token;
    }

}
