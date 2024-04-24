import { KnLoggerInterface } from "../models/AssureAlias";
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
    
}
