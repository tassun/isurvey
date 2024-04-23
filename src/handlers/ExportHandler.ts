import { KnDBConnector, KnResultSet, KnRecordSet, KnSQL } from 'will-sql';
import { Utilities } from 'will-util';
import { KnContextInfo, KnExportInfo, KnFormatInfo } from '../models/AssureAlias';
import { ProcessHandler } from './ProcessHandler';
import path from 'path';
import fs from 'fs';

export class ExportHandler extends ProcessHandler {
    public exportDir: string = path.join(process.cwd(),"export");
    public exportInfo: KnExportInfo[] = [
        {table:"users",file:"users.csv"}
    ];

    protected override async doExport(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processExport(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    public async processExport(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let result = this.createRecordSet();
        for(let info of this.exportInfo) {
            let rs = await this.collectData(context, db, info.table);
            if(rs) {
                this.writeDataFile(info.file,rs)
                result.records++;
                result.rows.push(info.file);
            }
        }
        return Promise.resolve(result);
    }

    public async collectData(context: KnContextInfo, db: KnDBConnector, tableName: string) : Promise<KnResultSet> {
        let sql = new KnSQL("select * from ").append(tableName);
        this.logger.info(this.constructor.name+".collectData:",sql);
        return await sql.executeQuery(db,context);
    }

    public async writeDataFile(fileName: string, rs: KnResultSet) : Promise<void> {
        let filePath = path.join(this.exportDir,fileName);
        this.logger.info(this.constructor.name+".writeDataFile:",filePath);
        let writer = fs.createWriteStream(filePath,"utf-8");
        if(rs.rows && rs.rows.length>0) {
            let header = Object.keys(rs.rows[0]).join(",");
            writer.write(header+"\n");
            for(let row of rs.rows) {
                row = this.transformData(row);
                let values = Object.values(row).map(function(value){ return value?"\""+value+"\"":value}) .join(",");
                writer.write(values+"\n");
            }
        }
        writer.end();
    }

    public override formatData(info: KnFormatInfo) : any {
        if(info.value instanceof Date) {
            if(info.field?.type == "DATE") {
                info.value = ExportHandler.formatDate(info.value as Date);
            } else if(info.field?.type == "TIME") {
                info.value = Utilities.formatTime(info.value as Date);
            } else if(info.field?.type == "DATETIME") {
                info.value = ExportHandler.formatDate(info.value as Date) +' '+Utilities.formatTime(info.value as Date);
            } else {
                info.value = ExportHandler.formatDate(info.value as Date);
            }
        }
        return info.value;
    }

    public static formatDate(date: Date) : string {
        let year = date.getFullYear();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, month, day].join('-');
    }
    
}
