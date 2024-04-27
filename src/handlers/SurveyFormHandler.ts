import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnModel, KnDataSet, KnDataTable } from '../models/AssureAlias';
import { OperateHandler } from '../base/OperateHandler';

export class SurveyFormHandler extends OperateHandler {

    public model : KnModel = {
        name: "survey_form",
        fields: {
            form_id: { type: "STRING", key: true },
            form_type: { type: "STRING" },
            form_title: { type: "STRING" },
            form_url: { type: "STRING" },
            form_table: { type: "STRING" },
            seqno: { type: "INTEGER" },
        }
    }

    public async catalog(context: KnContextInfo) : Promise<KnDataTable> {
        return this.doCatalog(context);
	}

    protected async doCatalog(context: KnContextInfo) : Promise<KnDataTable> {
        let db = this.getPrivateConnector();
        try {
            return await this.processCatalog(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    public async processCatalog(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataTable> {
        let dataset : KnDataSet = {profile_id: context.params.profile_id};
        let entity : KnDataSet = {};
        let rs = await this.processList(context, db);
        if(rs.rows.length > 0) {
            for(let row of rs.rows) {
                let type = row["form_type"];
                if(!entity[type]) {
                    let data : KnDataSet = {};
                    data["type_title"] = row["type_title"];
                    data["rows"] = [];
                    entity[type] = data;
                }
                let rows = entity[type]["rows"];
                rows.push({
                    form_id: row["form_id"],
                    form_title: row["form_title"],
                    form_url: row["form_url"],
                    form_table: row["form_table"],
                    seqno: row["seqno"],
                    editable: row["editable"]
                });
            }
        }
        let result = this.createDataTable("catalog", dataset, entity);
        return Promise.resolve(result);
    }

    public override async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let profile_id = context.params.profile_id;
        let sql = new KnSQL();
        sql.append("SELECT f.*,t.type_title,t.seqno AS typeno,IF(p.profile_id IS NULL,'0','1') AS editable ");
        sql.append("FROM survey_form f ");
        sql.append("JOIN survey_form_type t ON t.type_id = f.form_type ");
        sql.append("LEFT JOIN survey_profile_form p ON p.form_id = f.form_id AND p.profile_id = ?profile_id ");
        sql.append("WHERE f.inactive = '0' ");
        sql.append("ORDER BY typeno, seqno ");        
        sql.set("profile_id",profile_id);
        this.logger.info(this.constructor.name+".processList:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

}
