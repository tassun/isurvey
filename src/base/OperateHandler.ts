import { KnRecordSet, KnDBConnector, KnSQL } from 'will-sql';
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
        await db.beginWork();
        try {
            let rs = await this.processInsert(context, db);
            await db.commitWork();
            return Promise.resolve(rs);
        } catch(ex: any) {
            await db.rollbackWork();
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
        await db.beginWork();
        try {
            let rs = await this.processUpdate(context, db);
            await db.commitWork();
            return Promise.resolve(rs);
        } catch(ex: any) {
            await db.rollbackWork();
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doRemove(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        await db.beginWork();
        try {
            let rs = await this.processRemove(context, db);
            await db.commitWork();
            return Promise.resolve(rs);
        } catch(ex: any) {
            await db.rollbackWork();
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
        let db = this.getPrivateConnector();
        try {
            return await this.processEdit(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doView(context: KnContextInfo) : Promise<KnDataTable> {
        let db = this.getPrivateConnector();
        try {
            return await this.processView(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doAdd(context: KnContextInfo) : Promise<KnDataTable> {
        return this.getDataAdd(context);
    }

    public async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        return this.createDataTable("add",this.emptyDataSet());
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
        if(this.model?.name) {
            let sql = new KnSQL();
            sql.append("select * from ").append(this.model?.name);
            this.logger.info(this.constructor.name+".processList:",sql);
            let rs = await sql.executeQuery(db,context);
            return Promise.resolve(this.createRecordSet(rs));
        } 
        return this.notImplementation();
    }
    
    public async processEdit(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataTable> {
        let rs = await this.processRetrieve(context,db);
        return await this.getDataEdit(context, db, rs);
    }

    public async processView(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataTable> {
        let rs = await this.processRetrieve(context,db);
        return await this.getDataView(context, db, rs);
    }

    public async getDataEdit(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        if(rs.rows && rs.rows.length>0) {
            let row = this.transformData(rs.rows[0]);
            return this.createDataTable("edit", row);
        }
        return this.recordNotFound();    
    }

    public async getDataView(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        if(rs.rows && rs.rows.length>0) {
            let row = this.transformData(rs.rows[0]);
            return this.createDataTable("view", row);
        }
        return this.recordNotFound();
    }

}
