import { KnRecordSet, KnDBConnector } from 'will-sql';
import { KnContextInfo, KnDataTable } from '../models/AssureAlias';
import { ProcessHandler } from './ProcessHandler';
import { Utilities } from 'will-util';

export class OperateHandler extends ProcessHandler {

    protected ensureTimestamp(context: KnContextInfo, data: any, created: boolean = true, updated: boolean = true) : any {
        let now = Utilities.now();
        if(created) {
            data.create_date = now;
            data.create_time = now;
            data.create_millis = now.getTime();
            data.create_by = context.meta?.user?.userid;
        }
        if(updated) {
            data.update_date = now;
            data.update_time = now;
            data.update_millis = now.getTime();
            data.update_by = context.meta?.user?.userid;
        }
        return data;
    }

    protected override async doInsert(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processInsert(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
	}

    protected override async doRetrieve(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processRetrieve(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doUpdate(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processUpdate(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doRemove(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processRemove(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doList(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processList(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doEdit(context: KnContextInfo) : Promise<KnDataTable> {
        let rs = await this.doRetrieve(context);
        if(rs.rows && rs.rows.length>0) {
            let row = this.transformData(rs.rows[0]);
            return this.createDataTable("edit", row);
        }
        return this.recordNotFound();
    }

    public async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        return this.notImplementation();
    }

    public async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        return this.notImplementation();
    }

    public async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        return this.notImplementation();
    }
    
    public async processRemove(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        return this.notImplementation();
    }
    
    public async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        return this.notImplementation();
    }

}
