import { KnDBConnector } from 'will-sql';
import { KnModel, KnContextInfo, KnDataSet } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class MeasureBHandler extends SurveyOperateHandler {
    public readonly form_id : string = "MEASURE_B";
    public model : KnModel = {
        name: "measure_b",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false  },
            MB_1_1: { type: "STRING", created: true, updated: true  },
            MB_1_2: { type: "STRING", created: true, updated: true  },
            MB_1_3: { type: "STRING", created: true, updated: true  },
            MB_1_4: { type: "STRING", created: true, updated: true  },
            MB_1_5: { type: "STRING", created: true, updated: true  },
            MB_1_6: { type: "STRING", created: true, updated: true  },
            MB_1_7: { type: "STRING", created: true, updated: true  },
            MB_1_8: { type: "STRING", created: true, updated: true  },
            MB_1_9: { type: "STRING", created: true, updated: true  },
            MB_1_10: { type: "STRING", created: true, updated: true  },
            MB_2_1: { type: "STRING", created: true, updated: true  },
            MB_2_2: { type: "STRING", created: true, updated: true  },
            MB_2_3: { type: "STRING", created: true, updated: true  },
            MB_2_4: { type: "STRING", created: true, updated: true  },
            MB_2_5: { type: "STRING", created: true, updated: true  },
            MB_2_6: { type: "STRING", created: true, updated: true  },
            MB_2_7: { type: "STRING", created: true, updated: true  },
            MB_2_8: { type: "STRING", created: true, updated: true  },
            MB_2_9: { type: "STRING", created: true, updated: true  },
            MB_2_10: { type: "STRING", created: true, updated: true  },
            MB_2_11: { type: "STRING", created: true, updated: true  },
            MB_2_12: { type: "STRING", created: true, updated: true  },
            MB_2_13: { type: "STRING", created: true, updated: true  },
            MB_2_14: { type: "STRING", created: true, updated: true  },
            MB_2_15: { type: "STRING", created: true, updated: true  },
            MB_2_16: { type: "STRING", created: true, updated: true  },
            MB_2_17: { type: "STRING", created: true, updated: true  },
            MB_C_known: { type: "INTEGER", created: true, updated: true  },
            MB_C_unknown: { type: "INTEGER", created: true, updated: true  },
            MB_C_noidea: { type: "INTEGER", created: true, updated: true  },
            MB_C_mark: { type: "INTEGER", created: true, updated: true  },
            MB_C_total: { type: "INTEGER", created: true, updated: true  },
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
        data.MB_C_known = 0;
        data.MB_C_unknown = 0;
        data.MB_C_noidea = 0;
        data.MB_C_mark = 0;
        data.MB_C_total = 0;
        let keys = Object.keys(data).filter(key => key.startsWith("MB_1_") || key.startsWith("MB_2_"));
        for (let key of keys) {
            let value = data[key];
            if (value === "1") {
                data.MB_C_known += 1;
            } else if (value === "2") {
                data.MB_C_unknown += 1;
            } else if (value === "3") {
                data.MB_C_noidea += 1;
            }
        }
        data.MB_C_mark = data.MB_C_known;
        data.MB_C_total = keys.length - data.MB_C_noidea;
        return data;
    }

}
