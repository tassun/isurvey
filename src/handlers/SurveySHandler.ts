import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet } from 'will-sql';
import { KnModel, KnDataSet, KnContextInfo, KnValidateInfo, KnDataTable } from '../models/AssureAlias';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class SurveySHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_S";
    public readonly alwaysSaveProfileForm : boolean = false;
    public model : KnModel = {
        name: "survey_s",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            SS_1_1: { type: "STRING", created: true, updated: true  },
            SS_1_1_1: { type: "INTEGER", created: true, updated: true  },
            SS_1_1_text: { type: "STRING", created: true, updated: true  },
            SS_1_2: { type: "STRING", created: true, updated: true  },
            SS_1_2_1: { type: "STRING", created: true, updated: true  },
            SS_1_2_text: { type: "STRING", created: true, updated: true  },
            SS_1_3: { type: "STRING", created: true, updated: true  },
            SS_2_1_1: { type: "STRING", created: true, updated: true  },
            SS_2_1_2: { type: "STRING", created: true, updated: true  },
            SS_2_2_1: { type: "STRING", created: true, updated: true  },
            SS_2_2_2: { type: "STRING", created: true, updated: true  },
            SS_2_2_3: { type: "STRING", created: true, updated: true  },
            SS_2_2_4: { type: "STRING", created: true, updated: true  },
            SS_2_2_5: { type: "STRING", created: true, updated: true  },
            SS_2_2_6: { type: "STRING", created: true, updated: true  },
            SS_2_2_7: { type: "STRING", created: true, updated: true  },
            SS_2_2_8: { type: "STRING", created: true, updated: true  },
            SS_2_3_1: { type: "STRING", created: true, updated: true  },
            SS_2_3_2: { type: "STRING", created: true, updated: true  },
            SS_2_3_3: { type: "STRING", created: true, updated: true  },
            SS_2_3_4: { type: "STRING", created: true, updated: true  },
            SS_2_3_5: { type: "STRING", created: true, updated: true  },
            SS_2_3_6: { type: "STRING", created: true, updated: true  },
            SS_2_3_7: { type: "STRING", created: true, updated: true  },
            SS_2_3_8: { type: "STRING", created: true, updated: true  },
            SS_2_3_9: { type: "STRING", created: true, updated: true  },
            SS_2_3_10: { type: "STRING", created: true, updated: true  },
            SS_2_4_1: { type: "STRING", created: true, updated: true  },
            SS_2_4_2: { type: "STRING", created: true, updated: true  },
            SS_2_4_3: { type: "STRING", created: true, updated: true  },
            SS_2_4_4: { type: "STRING", created: true, updated: true  },
            SS_2_4_5: { type: "STRING", created: true, updated: true  },
            SS_2_4_6: { type: "STRING", created: true, updated: true  },
            SS_2_4_7: { type: "STRING", created: true, updated: true  },
            SS_2_5_1: { type: "STRING", created: true, updated: true  },
            SS_2_5_2: { type: "STRING", created: true, updated: true  },
            SS_2_5_3: { type: "STRING", created: true, updated: true  },
            SS_2_5_4: { type: "STRING", created: true, updated: true  },
            SS_2_5_5: { type: "STRING", created: true, updated: true  },
            SS_2_5_6: { type: "STRING", created: true, updated: true  },
            SS_2_5_7: { type: "STRING", created: true, updated: true  },
            SS_2_6_1: { type: "STRING", created: true, updated: true  },
            SS_2_6_2: { type: "STRING", created: true, updated: true  },
            SS_2_6_3: { type: "STRING", created: true, updated: true  },
            SS_2_6_4: { type: "STRING", created: true, updated: true  },
            SS_2_6_5: { type: "STRING", created: true, updated: true  },
            SS_2_6_6: { type: "STRING", created: true, updated: true  },
            SS_2_6_7: { type: "STRING", created: true, updated: true  },
            SS_2_6_8: { type: "STRING", created: true, updated: true  },
            SS_2_6_9: { type: "STRING", created: true, updated: true  },
            SS_2_7_1: { type: "STRING", created: true, updated: true  },
            SS_2_7_2: { type: "STRING", created: true, updated: true  },
            SS_2_7_3: { type: "STRING", created: true, updated: true  },
            SS_2_8_1: { type: "STRING", created: true, updated: true  },
            SS_2_8_2: { type: "STRING", created: true, updated: true  },
            SS_2_8_3: { type: "STRING", created: true, updated: true  },
            SS_2_9_1: { type: "STRING", created: true, updated: true  },
            SS_2_9_2: { type: "STRING", created: true, updated: true  },
            SS_2_9_3: { type: "STRING", created: true, updated: true  },
            SS_2_9_4: { type: "STRING", created: true, updated: true  },
            SS_2_9_5: { type: "STRING", created: true, updated: true  },
            SS_2_9_6: { type: "STRING", created: true, updated: true  },
            SS_2_9_7: { type: "STRING", created: true, updated: true  },
            SS_2_9_8: { type: "STRING", created: true, updated: true  },
            SS_3_1: { type: "STRING", created: true, updated: true  },
            SS_3_2: { type: "STRING", created: true, updated: true  },
            SS_3_3: { type: "STRING", created: true, updated: true  },
            SS_3_4: { type: "STRING", created: true, updated: true  },
            SS_3_5: { type: "STRING", created: true, updated: true  },
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
        return dt;
    }

    public override async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let rs = await super.processUpdate(context, db);
        if(rs && rs.records <= 0) {
            rs = await super.processInsert(context, db);
        }
        return Promise.resolve(rs);
    }

    protected override validateRequireFields(context: KnContextInfo, throwError: boolean = false, action?: string) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"survey_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    protected override async validateRequireFieldsInsert(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        return Promise.resolve({valid: true});
    }

    protected override processCalculate(context: KnContextInfo, db: KnDBConnector, data: KnDataSet) : KnDataSet {
        let SS_1_1_1_2 = context.params.SS_1_1_1_2;
        let SS_1_1_1_3 = context.params.SS_1_1_1_3;
        if(SS_1_1_1_2 && SS_1_1_1_2.trim().length > 0) data.SS_1_1_1 = SS_1_1_1_2;
        if(SS_1_1_1_3 && SS_1_1_1_3.trim().length > 0) data.SS_1_1_1 = SS_1_1_1_3;
        let SS_1_2_1_2 = context.params.SS_1_2_1_2;
        let SS_1_2_1_3 = context.params.SS_1_2_1_3;
        let SS_1_2_1_4 = context.params.SS_1_2_1_4;
        let SS_1_2_1_5 = context.params.SS_1_2_1_5;
        let SS_1_2_1_6 = context.params.SS_1_2_1_6;
        let SS_1_2_1_7 = context.params.SS_1_2_1_7;
        let SS_1_2_1_8 = context.params.SS_1_2_1_8;
        let SS_1_2_1_9 = context.params.SS_1_2_1_9;
        if(SS_1_2_1_2 && SS_1_2_1_2.trim().length > 0) data.SS_1_2_1 = SS_1_2_1_2;
        if(SS_1_2_1_3 && SS_1_2_1_3.trim().length > 0) data.SS_1_2_1 = SS_1_2_1_3;
        if(SS_1_2_1_4 && SS_1_2_1_4.trim().length > 0) data.SS_1_2_1 = SS_1_2_1_4;
        if(SS_1_2_1_5 && SS_1_2_1_5.trim().length > 0) data.SS_1_2_1 = SS_1_2_1_5;
        if(SS_1_2_1_6 && SS_1_2_1_6.trim().length > 0) data.SS_1_2_1 = SS_1_2_1_6;
        if(SS_1_2_1_7 && SS_1_2_1_7.trim().length > 0) data.SS_1_2_1 = SS_1_2_1_7;
        if(SS_1_2_1_8 && SS_1_2_1_8.trim().length > 0) data.SS_1_2_1 = SS_1_2_1_8;
        if(SS_1_2_1_9 && SS_1_2_1_9.trim().length > 0) data.SS_1_2_1 = SS_1_2_1_9;
        return data;
    }

}
