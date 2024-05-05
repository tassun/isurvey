import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnModel, KnContextInfo, KnDataTable } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class SurveyBHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_B";
    public model : KnModel = {
        name: "survey_b",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false },
            SB_family: { type: "STRING", created: true, updated: true  },
            SB_surveyor: { type: "STRING", created: true, updated: true  },
            create_date: { type: "DATE", created: true, updated: false  },
            create_time: { type: "TIME", created: true, updated: false  },
            create_millis: { type: "BIGINT", created: true, updated: false  },
            create_by: { type: "STRING", created: true, updated: false  },
            update_date: { type: "DATE", created: true, updated: true  },
            update_time: { type: "TIME", created: true, updated: true  },
            update_millis: { type: "BIGINT", created: true, updated: true  },
            update_by: { type: "STRING", created: true, updated: true  }
        }
    };

    public override async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await super.getDataAdd(context);
        dt.dataset.survey_id = uuid();
        let row = {survey_id: uuid(), profile_id: dt.dataset.profile_id, master_id: dt.dataset.survey_id, refer_id: uuid(), survey_type: "A"};
        dt.dataset.rows = [row];
        dt.dataset.SB_family_counter = dt.dataset.rows.length;
        return dt;
    }

    public async getDataEdit(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataEdit(context, db, rs);
        let master_id = dt.dataset.survey_id;
        let sql = new KnSQL();
        sql.append("SELECT * ");
        sql.append("FROM survey_bx ");
        sql.append("WHERE master_id = ?master_id ");
        sql.append("ORDER BY survey_type, create_millis ");
        sql.set("master_id", master_id);
        let rs2 = await sql.executeQuery(db, context);
        dt.dataset.rows = rs2.rows;
        if(dt.dataset.rows.length == 0) {
            let row = {survey_id: uuid(), profile_id: dt.dataset.profile_id, master_id: dt.dataset.survey_id, refer_id: uuid(), survey_type: "A"};
            dt.dataset.rows = [row];
        }
        dt.dataset.SB_family_counter = dt.dataset.rows.length;    
        return dt;
    }

    public override async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let rs = await super.processInsert(context, db);        
        await this.processUpdateState(context, db, rs.rows.survey_id);
        return Promise.resolve(rs);
    }

    public override async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let survey_id = context.params.survey_id;
        let rs = await super.processUpdate(context, db);
        await this.processUpdateState(context, db, survey_id);
        return Promise.resolve(rs);
    }

    public async processUpdateState(context: KnContextInfo, db: KnDBConnector, survey_id: string) : Promise<KnRecordSet> {
        //this survey_id is master_id of survey_bx
        let sql = new KnSQL();
        sql.append("UPDATE survey_bx set survey_state = 'CONFIRM' ");
        sql.append("WHERE master_id = ?master_id ");
        sql.set("master_id", survey_id);
        this.logger.info(this.constructor.name+".processUpdateState:",sql);
        let rs = await sql.executeUpdate(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

}
