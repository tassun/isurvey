import { KnModel } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class MeasureBHandler extends SurveyOperateHandler {
    public readonly form_id : string = "MEASURE_B";
    public model : KnModel = {
        name: "measure_b",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: true  },
            profile_id: { type: "STRING", created: true  },
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

}
