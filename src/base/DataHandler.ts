import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { Utilities } from 'will-util';
import { KnContextInfo, KnDataCategory, KnDataTableResultSet, KnDataEntity, KnDataMapRecordSetting, KnDataMapSetting, KnDataMapEntitySetting } from '../models/AssureAlias';
import { ProcessHandler } from './ProcessHandler';
import { KnUtility } from '../utils/KnUtility';

export class DataHandler extends ProcessHandler { 

    public async category(context: KnContextInfo) : Promise<KnDataCategory> {
        return this.doCategory(context);
    }

    public async categories(context: KnContextInfo) : Promise<KnDataTableResultSet[]> {
        return this.doCategories(context);
    }

    public async categorize(context: KnContextInfo) : Promise<KnDataEntity> {
        return this.doCategorize(context);
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

    protected async doCategorize(context: KnContextInfo) : Promise<KnDataEntity> {
        let db = this.getPrivateConnector();
        try {
            return await this.processCategorize(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    public async processCategory(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataCategory> {
        let tables = context.params.tables;
        if(Utilities.isString(tables)) tables = tables.split(",");
        return await this.getCategory(context,db,...tables);
    }

    public async getCategory(context: KnContextInfo, db: KnDBConnector, ...tables: string[]) : Promise<KnDataCategory> {
        let results : KnDataCategory = {};
        for(let table of tables) {
            let rs = await this.getRecordSet(context,db,table);
            results[table] = {tablename: table, resultset: rs};
        };
        return Promise.resolve(results);
    }

    public async getDataCategorize(category: KnDataCategory, defaultSettings: KnDataMapSetting = {keyName: "key_code", valueNames:["name_th"]}) : Promise<KnDataEntity> {
        let result : KnDataEntity = { };
        for(let key in category) {
            let dts = category[key];
            let options = dts.options || defaultSettings;
            let settings = options as KnDataMapSetting;
            let setting : KnDataMapRecordSetting = {tablename: dts.tablename, resultset: dts.resultset, setting: settings};
            let map = KnUtility.createDataEntity([setting]);
            result = Object.assign(result, map);            
        }
        return Promise.resolve(result);
    }

    public async processCategories(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataTableResultSet[]> {
        let tables = context.params.tables;
        if(Utilities.isString(tables)) tables = tables.split(",");
        return await this.getCategories(context,db,tables);
    }

    public async processCategorize(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataEntity> {
        let tables = context.params.tables;
        if(Utilities.isString(tables)) tables = tables.split(",");
        return await this.getCategorize(context,db,tables);
    }

    public async getCategories(context: KnContextInfo, db: KnDBConnector, ...tables: string[]) : Promise<KnDataTableResultSet[]> {
        let results : KnDataTableResultSet[] = [];
        for(let table of tables) {
            let rs = await this.getRecordSet(context,db,table);
            results.push({tablename: table, resultset: rs});
        };
        return Promise.resolve(results);
    }

    public async getCategorize(context: KnContextInfo, db: KnDBConnector, ...tables: string[]) : Promise<KnDataEntity> {
        let category = await this.getCategory(context,db,...tables);
        return await this.getDataCategorize(category);
    }

    public async getRecordSet(context: KnContextInfo, db: KnDBConnector, tablename: string) : Promise<KnRecordSet> {
        let sql = new KnSQL("select * from ").append(tablename);
        this.logger.info(this.constructor.name+".getRecordSet:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

}