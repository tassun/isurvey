import { KnDBConnector } from 'will-sql';
import { KnModel, KnContextInfo, KnDataSet } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class MeasureEHandler extends SurveyOperateHandler {
    public readonly form_id : string = "MEASURE_E";
    public model : KnModel = {
        name: "measure_e",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            ME_1_1: { type: "STRING", created: true, updated: true  },
            ME_1_2: { type: "STRING", created: true, updated: true  },
            ME_1_3: { type: "STRING", created: true, updated: true  },
            ME_1_4: { type: "STRING", created: true, updated: true  },
            ME_1_5: { type: "STRING", created: true, updated: true  },
            ME_1_6: { type: "STRING", created: true, updated: true  },
            ME_2_1: { type: "STRING", created: true, updated: true  },
            ME_2_2: { type: "STRING", created: true, updated: true  },
            ME_2_3: { type: "STRING", created: true, updated: true  },
            ME_2_4: { type: "STRING", created: true, updated: true  },
            ME_2_5: { type: "STRING", created: true, updated: true  },
            ME_2_6: { type: "STRING", created: true, updated: true  },
            ME_2_7: { type: "STRING", created: true, updated: true  },
            ME_2_8: { type: "STRING", created: true, updated: true  },
            ME_2_9: { type: "STRING", created: true, updated: true  },
            ME_2_10: { type: "STRING", created: true, updated: true  },
            ME_2_11: { type: "STRING", created: true, updated: true  },
            ME_2_12: { type: "STRING", created: true, updated: true  },
            ME_2_13: { type: "STRING", created: true, updated: true  },
            ME_2_14: { type: "STRING", created: true, updated: true  },
            ME_2_15: { type: "STRING", created: true, updated: true  },
            ME_2_16: { type: "STRING", created: true, updated: true  },
            ME_2_17: { type: "STRING", created: true, updated: true  },
            ME_2_18: { type: "STRING", created: true, updated: true  },
            ME_2_19: { type: "STRING", created: true, updated: true  },
            ME_2_19_text: { type: "STRING", created: true, updated: true  },
            ME_3_1: { type: "STRING", created: true, updated: true  },
            ME_3_2: { type: "STRING", created: true, updated: true  },
            ME_3_3: { type: "STRING", created: true, updated: true  },
            ME_3_4: { type: "STRING", created: true, updated: true  },
            ME_3_5: { type: "STRING", created: true, updated: true  },
            ME_3_6: { type: "STRING", created: true, updated: true  },
            ME_3_7: { type: "STRING", created: true, updated: true  },
            ME_3_8: { type: "STRING", created: true, updated: true  },
            ME_3_9: { type: "STRING", created: true, updated: true  },
            ME_3_10: { type: "STRING", created: true, updated: true  },
            ME_3_11: { type: "STRING", created: true, updated: true  },
            ME_3_12: { type: "STRING", created: true, updated: true  },
            ME_3_13: { type: "STRING", created: true, updated: true  },
            ME_3_14: { type: "STRING", created: true, updated: true  },
            ME_3_15: { type: "STRING", created: true, updated: true  },
            ME_3_16: { type: "STRING", created: true, updated: true  },
            ME_3_17: { type: "STRING", created: true, updated: true  },
            ME_3_18: { type: "STRING", created: true, updated: true  },
            ME_3_19: { type: "STRING", created: true, updated: true  },
            ME_3_19_text: { type: "STRING", created: true, updated: true  },
            ME_3_20: { type: "STRING", created: true, updated: true  },
            ME_3_21: { type: "STRING", created: true, updated: true  },
            ME_3_22: { type: "STRING", created: true, updated: true  },
            ME_3_23: { type: "STRING", created: true, updated: true  },
            ME_3_24: { type: "STRING", created: true, updated: true  },
            ME_3_25: { type: "STRING", created: true, updated: true  },
            ME_3_26: { type: "STRING", created: true, updated: true  },
            ME_3_27: { type: "STRING", created: true, updated: true  },
            ME_3_28: { type: "STRING", created: true, updated: true  },
            ME_3_29: { type: "STRING", created: true, updated: true  },
            ME_3_30: { type: "STRING", created: true, updated: true  },
            ME_3_30_text: { type: "STRING", created: true, updated: true  },
            ME_4_1: { type: "STRING", created: true, updated: true  },
            ME_C_3_21_sum: { type: "INTEGER", created: true, updated: true  },
            ME_C_3_22_sum: { type: "INTEGER", created: true, updated: true  },
            ME_C_3_23_sum: { type: "INTEGER", created: true, updated: true  },
            ME_C_3_formal: { type: "INTEGER", created: true, updated: true  },
            ME_C_3_informal: { type: "INTEGER", created: true, updated: true  },
            ME_C_known: { type: "INTEGER", created: true, updated: true  },
            ME_C_unknown: { type: "INTEGER", created: true, updated: true  },
            ME_C_noidea: { type: "INTEGER", created: true, updated: true  },
            ME_C_mark: { type: "INTEGER", created: true, updated: true  },
            ME_C_total: { type: "INTEGER", created: true, updated: true  },
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

    protected override processCalculate(context: KnContextInfo, db: KnDBConnector, data: KnDataSet) : KnDataSet {
        data.ME_C_known = 0;
        data.ME_C_unknown = 0;
        data.ME_C_noidea = 0;
        data.ME_C_mark = 0;
        data.ME_C_total = 0;
        let keys = Object.keys(data).filter(key => key.startsWith("ME_1_"));
        for (let key of keys) {
            let value = data[key];
            if (value === "1") {
                data.ME_C_known += 1;
            } else if (value === "2") {
                data.ME_C_unknown += 1;
            } else if (value === "3") {
                data.ME_C_noidea += 1;
            }
        }
        data.ME_C_mark = data.ME_C_known;
        data.ME_C_total = keys.length - data.ME_C_noidea;

        let keys_21 = ["ME_3_1","ME_3_2"];
        let keys_22 = ["ME_3_3","ME_3_4","ME_3_5","ME_3_6","ME_3_7","ME_3_8","ME_3_9","ME_3_10","ME_3_11","ME_3_12","ME_3_13","ME_3_14","ME_3_15","ME_3_16","ME_3_17","ME_3_18","ME_3_19"];
        let keys_23 = ["ME_3_20","ME_3_21","ME_3_22","ME_3_23","ME_3_24","ME_3_25","ME_3_26","ME_3_27","ME_3_28","ME_3_29","ME_3_30"];
        let keys_formal = ["ME_3_1","ME_3_2","ME_3_3","ME_3_4","ME_3_5","ME_3_6","ME_3_7","ME_3_8","ME_3_9","ME_3_13","ME_3_14","ME_3_15","ME_3_16","ME_3_17"];
        let keys_informal = ["ME_3_10","ME_3_11","ME_3_12","ME_3_18","ME_3_19"];
        data.ME_C_3_21_sum = keys_21.reduce((sum, key) => data[key] === "1" ? sum + 1 : sum, 0);
        data.ME_C_3_22_sum = keys_22.reduce((sum, key) => data[key] === "1" ? sum + 1 : sum, 0);
        data.ME_C_3_23_sum = keys_23.reduce((sum, key) => data[key] === "1" ? sum + 1 : sum, 0);
        data.ME_C_3_formal = keys_formal.reduce((sum, key) => data[key] === "1" ? sum + 1 : sum, 0);
        data.ME_C_3_informal = keys_informal.reduce((sum, key) => data[key] === "1" ? sum + 1 : sum, 0);

        return data;
    }

}
