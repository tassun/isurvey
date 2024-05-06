import { KnDBConnector } from 'will-sql';
import { KnModel, KnContextInfo, KnDataSet } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';
import { Utilities } from 'will-util';

export class MeasureDHandler extends SurveyOperateHandler {
    public readonly form_id : string = "MEASURE_D";
    public model : KnModel = {
        name: "measure_d",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            MD_1_1: { type: "STRING", created: true, updated: true  },
            MD_1_2: { type: "STRING", created: true, updated: true  },
            MD_1_3: { type: "STRING", created: true, updated: true  },
            MD_1_4: { type: "STRING", created: true, updated: true  },
            MD_1_5: { type: "STRING", created: true, updated: true  },
            MD_1_6: { type: "STRING", created: true, updated: true  },
            MD_1_7: { type: "STRING", created: true, updated: true  },
            MD_2_1: { type: "STRING", created: true, updated: true  },
            MD_2_2: { type: "STRING", created: true, updated: true  },
            MD_2_3: { type: "STRING", created: true, updated: true  },
            MD_2_4: { type: "STRING", created: true, updated: true  },
            MD_2_5: { type: "STRING", created: true, updated: true  },
            MD_2_6: { type: "STRING", created: true, updated: true  },
            MD_2_7: { type: "STRING", created: true, updated: true  },
            MD_2_8: { type: "STRING", created: true, updated: true  },
            MD_3_1: { type: "STRING", created: true, updated: true  },
            MD_3_2: { type: "STRING", created: true, updated: true  },
            MD_3_3: { type: "STRING", created: true, updated: true  },
            MD_3_4: { type: "STRING", created: true, updated: true  },
            MD_3_5: { type: "STRING", created: true, updated: true  },
            MD_3_6: { type: "STRING", created: true, updated: true  },
            MD_3_7: { type: "STRING", created: true, updated: true  },
            MD_3_8: { type: "STRING", created: true, updated: true  },
            MD_3_text: { type: "STRING", created: true, updated: true  },
            MD_4_text: { type: "STRING", created: true, updated: true  },
            MD_5_text: { type: "STRING", created: true, updated: true  },
            MD_C_1_mark: { type: "INTEGER", created: true, updated: true  },
            MD_C_1_total: { type: "INTEGER", created: true, updated: true  },
            MD_C_1_avg: { type: "DECIMAL", created: true, updated: true  },
            MD_C_2_mark: { type: "INTEGER", created: true, updated: true  },
            MD_C_2_total: { type: "INTEGER", created: true, updated: true  },
            MD_C_2_avg: { type: "DECIMAL", created: true, updated: true  },
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
        data.MD_C_1_mark = 0;
        data.MD_C_1_total = 0;
        data.MD_C_1_avg = 0.0;
        let keys = Object.keys(data).filter(key => key.startsWith("MD_1_"));
        for (let key of keys) {
            let value = data[key];
            let mark = Utilities.parseInteger(value);
            if(!mark) mark = 0;
            data.MD_C_1_mark += mark;
        }
        data.MD_C_1_total = keys.length;
        data.MD_C_1_avg = data.MD_C_1_total>0?data.MD_C_1_mark / data.MD_C_1_total:0.0;

        data.MD_C_2_mark = 0;
        data.MD_C_2_total = 0;
        data.MD_C_2_avg = 0.0;
        keys = Object.keys(data).filter(key => key.startsWith("MD_2_"));
        for (let key of keys) {
            let value = data[key];
            let mark = Utilities.parseInteger(value);
            if(!mark) mark = 0;
            data.MD_C_2_mark += mark;
        }
        data.MD_C_2_total = keys.length;
        data.MD_C_2_avg = data.MD_C_2_total>0?data.MD_C_2_mark / data.MD_C_2_total:0.0;

        return data;
    }

}
