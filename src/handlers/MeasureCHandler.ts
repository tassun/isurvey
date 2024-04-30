import { KnDBConnector } from 'will-sql';
import { KnModel, KnContextInfo, KnDataSet } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';
import { Utilities } from 'will-util';

export class MeasureCHandler extends SurveyOperateHandler {
    public readonly form_id : string = "MEASURE_C";
    public model : KnModel = {
        name: "measure_c",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: true  },
            profile_id: { type: "STRING", created: true },
            MC_1_1: { type: "STRING", created: true, updated: true  },
            MC_1_2: { type: "STRING", created: true, updated: true  },
            MC_1_3: { type: "STRING", created: true, updated: true  },
            MC_1_4: { type: "STRING", created: true, updated: true  },
            MC_1_5: { type: "STRING", created: true, updated: true  },
            MC_2_1: { type: "STRING", created: true, updated: true  },
            MC_2_2: { type: "STRING", created: true, updated: true  },
            MC_2_3: { type: "STRING", created: true, updated: true  },
            MC_2_4: { type: "STRING", created: true, updated: true  },
            MC_2_5: { type: "STRING", created: true, updated: true  },
            MC_2_6: { type: "STRING", created: true, updated: true  },
            MC_2_7: { type: "STRING", created: true, updated: true  },
            MC_2_8: { type: "STRING", created: true, updated: true  },
            MC_2_9: { type: "STRING", created: true, updated: true  },
            MC_2_10: { type: "STRING", created: true, updated: true  },
            MC_2_11: { type: "STRING", created: true, updated: true  },
            MC_2_12: { type: "STRING", created: true, updated: true  },
            MC_2_13: { type: "STRING", created: true, updated: true  },
            MC_2_14: { type: "STRING", created: true, updated: true  },
            MC_2_15: { type: "STRING", created: true, updated: true  },
            MC_2_text: { type: "STRING", created: true, updated: true  },
            MC_3_text: { type: "STRING", created: true, updated: true  },
            MC_C_mark: { type: "INTEGER", created: true, updated: true  },
            MC_C_total: { type: "INTEGER", created: true, updated: true  },
            MC_C_avg: { type: "DECIMAL", created: true, updated: true  },
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
        data.MC_C_mark = 0;
        data.MC_C_total = 0;
        data.MC_C_avg = 0.0;
        let keys = Object.keys(data).filter(key => key.startsWith("MC_1_"));
        for (let key of keys) {
            let value = data[key];
            let mark = Utilities.parseInteger(value);
            if(!mark) mark = 0;
            data.MC_C_mark += mark;
        }
        data.MC_C_total = keys.length;
        data.MC_C_avg = data.MC_C_total>0?data.MC_C_mark / data.MC_C_total:0.0;
        return data;
    }

}
