import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { Utilities } from 'will-util';
import { KnContextInfo, KnDataCategory, KnDataTableResultSet } from '../models/AssureAlias';
import { ProcessHandler } from './ProcessHandler';

export class DataHandler extends ProcessHandler { 

    public async category(context: KnContextInfo) : Promise<KnDataCategory> {
        return this.doCategory(context);
    }

    public async categories(context: KnContextInfo) : Promise<KnDataTableResultSet[]> {
        return this.doCategories(context);
    }

    protected async doCategory(context: KnContextInfo) : Promise<KnDataCategory> {
        let db = this.getPrivateConnector();
        try {
            return await this.processCategory(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected async doCategories(context: KnContextInfo) : Promise<KnDataTableResultSet[]> {
        let db = this.getPrivateConnector();
        try {
            return await this.processCategories(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    public async processCategory(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataCategory> {
        let results : KnDataCategory = {};
        let tables = context.params.tables;
        if(Utilities.isString(tables)) tables = tables.split(",");
        for(let table of tables) {
            let rs = await this.getRecordSet(context,db,table);
            results[table] = {tablename: table, resultset: rs};
        };
        return Promise.resolve(results);
    }

    public async processCategories(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataTableResultSet[]> {
        let results : KnDataTableResultSet[] = [];
        let tables = context.params.tables;
        if(Utilities.isString(tables)) tables = tables.split(",");
        for(let table of tables) {
            let rs = await this.getRecordSet(context,db,table);
            results.push({tablename: table, resultset: rs});
        };
        return Promise.resolve(results);
    }

    public async getRecordSet(context: KnContextInfo, db: KnDBConnector, tablename: string) : Promise<KnRecordSet> {
        let sql = new KnSQL("select * from ").append(tablename);
        this.logger.info(this.constructor.name+".getRecordSet:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

}