import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnModel, KnContextInfo, KnDataTable } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class SurveyDHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_D";
    public model : KnModel = {
        name: "survey_d",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false },
            SD_1_1: { type: "STRING", created: true, updated: true  },
            SD_1_2: { type: "STRING", created: true, updated: true  },
            SD_1_refer: { type: "STRING", created: true, updated: true  },
            SD_2_1: { type: "STRING", created: true, updated: true  },
            SD_2_2: { type: "STRING", created: true, updated: true  },
            SD_2_refer: { type: "STRING", created: true, updated: true  },
            SD_3_1: { type: "STRING", created: true, updated: true  },
            SD_3_2: { type: "STRING", created: true, updated: true  },
            SD_3_refer: { type: "STRING", created: true, updated: true  },
            SD_4_1: { type: "STRING", created: true, updated: true  },
            SD_4_2: { type: "STRING", created: true, updated: true  },
            SD_4_refer: { type: "STRING", created: true, updated: true  },
            SD_5_1: { type: "STRING", created: true, updated: true  },
            SD_5_2: { type: "STRING", created: true, updated: true  },
            SD_5_refer: { type: "STRING", created: true, updated: true  },
            SD_6_1: { type: "STRING", created: true, updated: true  },
            SD_6_2: { type: "STRING", created: true, updated: true  },
            SD_6_refer: { type: "STRING", created: true, updated: true  },
            SD_7_1: { type: "STRING", created: true, updated: true  },
            SD_7_2: { type: "STRING", created: true, updated: true  },
            SD_7_refer: { type: "STRING", created: true, updated: true  },
            SD_8_1: { type: "STRING", created: true, updated: true  },
            SD_8_2: { type: "STRING", created: true, updated: true  },
            SD_8_refer: { type: "STRING", created: true, updated: true  },
            SD_9_1: { type: "STRING", created: true, updated: true  },
            SD_9_2: { type: "STRING", created: true, updated: true  },
            SD_9_refer: { type: "STRING", created: true, updated: true  },
            SD_10_1: { type: "STRING", created: true, updated: true  },
            SD_10_2: { type: "STRING", created: true, updated: true  },
            SD_10_refer: { type: "STRING", created: true, updated: true  },
            SD_11_1: { type: "STRING", created: true, updated: true  },
            SD_11_2: { type: "STRING", created: true, updated: true  },
            SD_11_refer: { type: "STRING", created: true, updated: true  },
            SD_12_1: { type: "STRING", created: true, updated: true  },
            SD_12_2: { type: "STRING", created: true, updated: true  },
            SD_12_refer: { type: "STRING", created: true, updated: true  },
            SD_13_1: { type: "STRING", created: true, updated: true  },
            SD_13_2: { type: "STRING", created: true, updated: true  },
            SD_13_refer: { type: "STRING", created: true, updated: true  },
            SD_14_1: { type: "STRING", created: true, updated: true  },
            SD_14_2: { type: "STRING", created: true, updated: true  },
            SD_14_refer: { type: "STRING", created: true, updated: true  },
            SD_15_1: { type: "STRING", created: true, updated: true  },
            SD_15_2: { type: "STRING", created: true, updated: true  },
            SD_15_refer: { type: "STRING", created: true, updated: true  },
            SD_16_1: { type: "STRING", created: true, updated: true  },
            SD_16_2: { type: "STRING", created: true, updated: true  },
            SD_16_refer: { type: "STRING", created: true, updated: true  },
            SD_17_1: { type: "STRING", created: true, updated: true  },
            SD_17_2: { type: "STRING", created: true, updated: true  },
            SD_17_refer: { type: "STRING", created: true, updated: true  },
            SD_18_1: { type: "STRING", created: true, updated: true  },
            SD_18_2: { type: "STRING", created: true, updated: true  },
            SD_18_refer: { type: "STRING", created: true, updated: true  },
            SD_19_1: { type: "STRING", created: true, updated: true  },
            SD_19_2: { type: "STRING", created: true, updated: true  },
            SD_19_refer: { type: "STRING", created: true, updated: true  },
            SD_20_1: { type: "STRING", created: true, updated: true  },
            SD_20_2: { type: "STRING", created: true, updated: true  },
            SD_20_refer: { type: "STRING", created: true, updated: true  },
            SD_21_1: { type: "STRING", created: true, updated: true  },
            SD_21_2: { type: "STRING", created: true, updated: true  },
            SD_21_refer: { type: "STRING", created: true, updated: true  },
            SD_22_1: { type: "STRING", created: true, updated: true  },
            SD_22_2: { type: "STRING", created: true, updated: true  },
            SD_22_refer: { type: "STRING", created: true, updated: true  },
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
        dt.dataset.profile_id = context.params.profile_id;
        dt.dataset.survey_id = uuid();
        return dt;
    }

    public async getDataEdit(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataEdit(context, db, rs);
        let master_id = dt.dataset.survey_id;
        let sql = new KnSQL();
        sql.append("SELECT column_id,COUNT(*) AS counter ");
        sql.append("FROM survey_dx ");
        sql.append("WHERE master_id = ?master_id ");
        sql.append("GROUP BY column_id ");
        sql.append("ORDER BY column_id ");
        sql.set("master_id", master_id);
        let rs2 = await sql.executeQuery(db, context);
        if(rs2.rows && rs2.rows.length > 0) {
            for(let row of rs2.rows) {
                for(let index = 1; index <= 22; index++) {
                    let key = "SD_"+index;
                    let counter_key = "SD_"+index+"_counter";
                    if(row.column_id == key) {
                        dt.dataset[counter_key] = row.counter;
                        break;
                    }
                }
            }
        }
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
        let sql = new KnSQL();
        sql.append("UPDATE survey_dx set survey_state = 'CONFIRM' ");
        sql.append("WHERE master_id = ?master_id ");
        sql.set("master_id", survey_id);
        this.logger.info(this.constructor.name+".processUpdateState:",sql);
        let rs = await sql.executeUpdate(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }
    
}
