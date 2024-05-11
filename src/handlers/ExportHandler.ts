import { KnDBConnector, KnResultSet, KnRecordSet, KnSQL } from 'will-sql';
import { Utilities } from 'will-util';
import { KnContextInfo, KnExportInfo, KnFormatInfo } from '../models/AssureAlias';
import { ProcessHandler } from '../base/ProcessHandler';
import path from 'path';
import fs from 'fs';

export class ExportHandler extends ProcessHandler {
    public exportDir: string = path.join(process.cwd(),"export");
    public exportInfo: KnExportInfo[] = [
        {table:"tusers",file:"users.csv"},
        {table:"survey_profile",file:"survey_profile.csv"},
        {table:"measure_b",file:"measure_b.csv"},
        {table:"measure_c",file:"measure_c.csv"},
        {table:"measure_d",file:"measure_d.csv"},
        {table:"measure_e",file:"measure_e.csv"},
        {table:"measure_f",file:"measure_f.csv"},
        {table:"measure_g",file:"measure_g.csv"},
        {table:"survey_b",file:"survey_b.csv"},
        {table:"survey_c",file:"survey_c.csv"},
        {table:"survey_d",file:"survey_d.csv"},
        {table:"survey_dx",file:"survey_dx.csv"},
        {table:"survey_e",file:"survey_e.csv"},
        {table:"survey_f",file:"survey_f.csv"},
        {table:"survey_g",file:"survey_g.csv"},
        {table:"survey_b1",file:"survey_b1.csv"},
        {table:"survey_b2",file:"survey_b2.csv"},
        {table:"survey_b3",file:"survey_b3.csv"},
        {table:"survey_b4",file:"survey_b4.csv"},
        {table:"survey_b5",file:"survey_b5.csv"},
        {table:"survey_b6",file:"survey_b6.csv"},
        {table:"survey_b7",file:"survey_b7.csv"}
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
            let rs = await this.getResultSet(context, db, info.table);
            if(rs) {
                await this.writeDataFile(info.file,rs)
                result.records++;
                result.rows.push(info.file);
            }
        }
        return Promise.resolve(result);
    }

    public async getResultSet(context: KnContextInfo, db: KnDBConnector, tableName: string) : Promise<KnResultSet> {
        let sql = new KnSQL("select * from ").append(tableName);
        this.logger.info(this.constructor.name+".getResultSet:",sql);
        return await sql.executeQuery(db,context);
    }

    public async writeDataFile(fileName: string, rs: KnResultSet) : Promise<void> {
        let filePath = path.join(this.exportDir,fileName);
        this.logger.info(this.constructor.name+".writeDataFile:",filePath);
        return new Promise<void>((resolve, reject) => {
            let writer = fs.createWriteStream(filePath,"utf-8");
            writer.on('finish', () => {
                this.logger.info(this.constructor.name+" finish writing: ",filePath);
                resolve();
            });
            writer.on('error', (err) => {
                this.logger.info(this.constructor.name+" writing error: "+filePath,err);
                reject(err);
            });            
            try {
                if(rs.rows && rs.rows.length>0) {
                    let header = Object.keys(rs.rows[0]).join(",");
                    writer.write(header+"\n");
                    for(let row of rs.rows) {
                        row = this.transformData(row);
                        let values = Object.values(row).map(function(value){ return value?"\""+value+"\"":value}) .join(",");
                        writer.write(values+"\n");
                    }
                }
            } finally {
                writer.end();
            }
        });
    }

    public override formatData(info: KnFormatInfo) : any {
        if(info.value instanceof Date) {
            if(info.field?.type == "DATE") {
                info.value = Utilities.formatDate(info.value as Date, true);
            } else if(info.field?.type == "TIME") {
                info.value = Utilities.formatTime(info.value as Date);
            } else if(info.field?.type == "DATETIME") {
                info.value = Utilities.formatDate(info.value as Date, true) +' '+Utilities.formatTime(info.value as Date);
            } else {
                info.value = Utilities.formatDate(info.value as Date, true);
            }
        }
        return info.value;
    }
    
}
