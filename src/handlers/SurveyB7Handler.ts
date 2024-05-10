import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnModel, KnContextInfo, KnDataTable, KnValidateInfo } from '../models/AssureAlias';
import { SurveyMasterHandler } from './SurveyMasterHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';

export class SurveyB7Handler extends SurveyMasterHandler {
    public readonly form_id : string = "SURVEY_B7";
    public readonly alwaysSaveProfileForm : boolean = false;
    public model : KnModel = {
        name: "survey_b7",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            master_id: { type: "STRING", created: true, updated: false, remark: "survey_b.survey_id" },
            fault_status: { type: "STRING", created: true, updated: true  },
            fault_behavior: { type: "STRING", created: true, updated: true  },
            fault_type: { type: "STRING", created: true, updated: true  },
            fault_nature: { type: "STRING", created: true, updated: true  },
            fault_character: { type: "STRING", created: true, updated: true  },
            fault_character_text: { type: "STRING", created: true, updated: true  },
            fault_event: { type: "STRING", created: true, updated: true  },
            fault_event_text: { type: "STRING", created: true, updated: true  },
            fault_relation: { type: "STRING", created: true, updated: true  },
            fault_relation_text: { type: "STRING", created: true, updated: true  },
            fault_location: { type: "STRING", created: true, updated: true  },
            fault_location_text: { type: "STRING", created: true, updated: true  },
            SB7_2_1: { type: "STRING", created: true, updated: true  },
            SB7_2_2_1: { type: "STRING", created: true, updated: true  },
            SB7_2_2_2: { type: "STRING", created: true, updated: true  },
            SB7_2_2_3: { type: "STRING", created: true, updated: true  },
            SB7_2_2_4: { type: "STRING", created: true, updated: true  },
            SB7_2_2_text: { type: "STRING", created: true, updated: true  },
            SB7_2_3_1: { type: "STRING", created: true, updated: true  },
            SB7_2_3_2: { type: "STRING", created: true, updated: true  },
            SB7_2_3_3: { type: "STRING", created: true, updated: true  },
            SB7_2_3_4: { type: "STRING", created: true, updated: true  },
            SB7_2_3_5: { type: "STRING", created: true, updated: true  },
            SB7_2_3_6: { type: "STRING", created: true, updated: true  },
            SB7_2_3_7: { type: "STRING", created: true, updated: true  },
            SB7_2_3_8: { type: "STRING", created: true, updated: true  },
            SB7_2_3_9: { type: "STRING", created: true, updated: true  },
            SB7_2_3_10: { type: "STRING", created: true, updated: true  },
            SB7_2_3_11: { type: "STRING", created: true, updated: true  },
            SB7_2_3_12: { type: "STRING", created: true, updated: true  },
            SB7_2_3_13: { type: "STRING", created: true, updated: true  },
            SB7_2_3_14: { type: "STRING", created: true, updated: true  },
            SB7_2_3_15: { type: "STRING", created: true, updated: true  },
            SB7_2_3_16: { type: "STRING", created: true, updated: true  },
            SB7_2_3_17: { type: "STRING", created: true, updated: true  },
            SB7_2_3_18: { type: "STRING", created: true, updated: true  },
            SB7_2_3_text: { type: "STRING", created: true, updated: true  },
            SB7_2_4: { type: "STRING", created: true, updated: true  },
            SB7_2_4_text: { type: "STRING", created: true, updated: true  },
            SB7_3_1: { type: "STRING", created: true, updated: true  },
            SB7_3_2_1: { type: "STRING", created: true, updated: true  },
            SB7_3_2_2: { type: "STRING", created: true, updated: true  },
            SB7_3_2_3: { type: "STRING", created: true, updated: true  },
            SB7_3_2_3_text: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_1: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_1_text: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_2: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_2_text: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_3: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_3_text: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_4: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_4_text: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_5: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_5_text: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_6: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_6_text: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_7: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_7_text: { type: "STRING", created: true, updated: true  },
            SB7_3_2_4_8: { type: "STRING", created: true, updated: true  },            
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

    /*
    protected async validateRequireFieldsList(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"master_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public override async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        await this.validateRequireFieldsList(context,true);
        let master_id = context.params.master_id;
        let sql = new KnSQL();
        sql.append("select * from ").append(this.model.name).append(" where master_id = ?master_id ");
        sql.set("master_id",master_id);
        this.logger.info(this.constructor.name+".processList:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async getDataListing(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataListing(context,db,rs);
        let survey_id = context.params.survey_id;
        let master_id = context.params.master_id;
        dt.dataset.survey_id = survey_id;
        dt.dataset.master_id = master_id;
        return Promise.resolve(dt);    
    }

    public override async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await super.getDataAdd(context);
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.master_id = context.params.master_id;
        return Promise.resolve(dt);
    }
    */
}
