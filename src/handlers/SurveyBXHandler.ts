import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnModel, KnContextInfo, KnDataTable } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class SurveyBXHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_BX";
    public readonly alwaysSaveProfileForm : boolean = false;
    public model : KnModel = {
        name: "survey_bx",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false },
            master_id: { type: "STRING", created: true, updated: false },
            survey_state: { type: "STRING", created: true, updated: false },
            survey_type: { type: "STRING", created: true, updated: false },
            SBX_name: { type: "STRING", created: true, updated: false },
            SBX_gender: { type: "STRING", created: true, updated: false },
            SBX_age: { type: "STRING", created: true, updated: false },
            SBX_crime: { type: "STRING", created: true, updated: false },
            SBX_remark: { type: "STRING", created: true, updated: false },
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
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.master_id = context.params.master_id;
        if(!dt.dataset.survey_id || dt.dataset.survey_id.trim().length==0) dt.dataset.survey_id = uuid();
        return dt;
    }

    public override async performInsert(context: KnContextInfo, db: KnDBConnector, data: any) : Promise<KnRecordSet> {
        let rs = await super.performInsert(context, db, data);        
        await this.processUpdateState(context, db, rs.rows.survey_id);
        return Promise.resolve(rs);
    }

    public override async performUpdate(context: KnContextInfo, db: KnDBConnector, data: any) : Promise<KnRecordSet> {
        let survey_id = context.params.survey_id;
        let rs = await super.performUpdate(context, db, data);
        await this.processUpdateState(context, db, survey_id);
        return Promise.resolve(rs);
    }

    public async processUpdateState(context: KnContextInfo, db: KnDBConnector, parent_id: string) : Promise<KnRecordSet> {
        let sql = new KnSQL();
        sql.append("UPDATE survey_by set survey_state = 'CONFIRM' ");
        sql.append("WHERE parent_id = ?parent_id ");
        sql.set("parent_id", parent_id);
        this.logger.info(this.constructor.name+".processUpdateState:",sql);
        let rs = await sql.executeUpdate(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

}
