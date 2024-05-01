import { KnModel } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class SurveyEHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_E";
    public model : KnModel = {
        name: "survey_e",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: true  },
            profile_id: { type: "STRING", created: true },
            SE_1_1: { type: "STRING", created: true, updated: true  },
            SE_1_1_R1: { type: "INTEGER", created: true, updated: true  },
            SE_1_1_R3: { type: "INTEGER", created: true, updated: true  },
            SE_1_2: { type: "STRING", created: true, updated: true  },
            SE_1_2_R1: { type: "INTEGER", created: true, updated: true  },
            SE_1_2_R3: { type: "INTEGER", created: true, updated: true  },
            SE_1_3: { type: "STRING", created: true, updated: true  },
            SE_1_3_R1: { type: "INTEGER", created: true, updated: true  },
            SE_1_3_R3: { type: "INTEGER", created: true, updated: true  },
            SE_1_4: { type: "STRING", created: true, updated: true  },
            SE_1_4_R1: { type: "INTEGER", created: true, updated: true  },
            SE_1_4_R3: { type: "INTEGER", created: true, updated: true  },
            SE_1_5: { type: "STRING", created: true, updated: true  },
            SE_1_5_R1: { type: "INTEGER", created: true, updated: true  },
            SE_1_5_R3: { type: "INTEGER", created: true, updated: true  },
            SE_1_6: { type: "STRING", created: true, updated: true  },
            SE_1_6_R1: { type: "INTEGER", created: true, updated: true  },
            SE_1_6_R3: { type: "INTEGER", created: true, updated: true  },
            SE_1_7: { type: "STRING", created: true, updated: true  },
            SE_1_7_R1: { type: "INTEGER", created: true, updated: true  },
            SE_1_7_R3: { type: "INTEGER", created: true, updated: true  },
            SE_2_1: { type: "STRING", created: true, updated: true  },
            SE_2_1_R1: { type: "INTEGER", created: true, updated: true  },
            SE_2_1_R3: { type: "INTEGER", created: true, updated: true  },
            SE_2_1_R5: { type: "INTEGER", created: true, updated: true  },
            SE_2_2: { type: "STRING", created: true, updated: true  },
            SE_2_2_R1: { type: "INTEGER", created: true, updated: true  },
            SE_2_2_R3: { type: "INTEGER", created: true, updated: true  },
            SE_2_2_R5: { type: "INTEGER", created: true, updated: true  },
            SE_2_3: { type: "STRING", created: true, updated: true  },
            SE_2_3_R1: { type: "INTEGER", created: true, updated: true  },
            SE_2_3_R3: { type: "INTEGER", created: true, updated: true  },
            SE_2_3_R5: { type: "INTEGER", created: true, updated: true  },
            SE_2_4: { type: "STRING", created: true, updated: true  },
            SE_2_4_R1: { type: "INTEGER", created: true, updated: true  },
            SE_2_4_R3: { type: "INTEGER", created: true, updated: true  },
            SE_2_4_R5: { type: "INTEGER", created: true, updated: true  },
            SE_2_5: { type: "STRING", created: true, updated: true  },
            SE_2_5_R1: { type: "INTEGER", created: true, updated: true  },
            SE_2_5_R3: { type: "INTEGER", created: true, updated: true  },
            SE_2_5_R5: { type: "INTEGER", created: true, updated: true  },
            SE_2_6: { type: "STRING", created: true, updated: true  },
            SE_2_6_R1: { type: "INTEGER", created: true, updated: true  },
            SE_2_6_R3: { type: "INTEGER", created: true, updated: true  },
            SE_2_6_R5: { type: "INTEGER", created: true, updated: true  },
            SE_2_7: { type: "STRING", created: true, updated: true  },
            SE_2_7_R1: { type: "INTEGER", created: true, updated: true  },
            SE_2_7_R3: { type: "INTEGER", created: true, updated: true  },
            SE_2_7_R5: { type: "INTEGER", created: true, updated: true  },
            SE_2_8: { type: "STRING", created: true, updated: true  },
            SE_2_8_R1: { type: "INTEGER", created: true, updated: true  },
            SE_2_8_R3: { type: "INTEGER", created: true, updated: true  },
            SE_2_8_R5: { type: "INTEGER", created: true, updated: true  },
            SE_3: { type: "STRING", created: true, updated: true  },
            SE_4: { type: "STRING", created: true, updated: true  },
            SE_5: { type: "STRING", created: true, updated: true  },
            SE_5_text: { type: "STRING", created: true, updated: true  },
            SE_6_1: { type: "STRING", created: true, updated: true  },
            SE_6_2: { type: "STRING", created: true, updated: true  },
            SE_6_3: { type: "STRING", created: true, updated: true  },
            SE_6_4: { type: "STRING", created: true, updated: true  },
            SE_6_5: { type: "STRING", created: true, updated: true  },
            SE_6_6: { type: "STRING", created: true, updated: true  },
            SE_6_7: { type: "STRING", created: true, updated: true  },
            SE_6_text: { type: "STRING", created: true, updated: true  },
            SE_7_1: { type: "STRING", created: true, updated: true  },
            SE_7_2: { type: "STRING", created: true, updated: true  },
            SE_7_3: { type: "STRING", created: true, updated: true  },
            SE_7_4: { type: "STRING", created: true, updated: true  },
            SE_7_5: { type: "STRING", created: true, updated: true  },
            SE_7_6: { type: "STRING", created: true, updated: true  },
            SE_7_7: { type: "STRING", created: true, updated: true  },
            SE_7_8: { type: "STRING", created: true, updated: true  },
            SE_7_9: { type: "STRING", created: true, updated: true  },
            SE_7_10: { type: "STRING", created: true, updated: true  },
            SE_7_11: { type: "STRING", created: true, updated: true  },
            SE_7_12: { type: "STRING", created: true, updated: true  },
            SE_7_13: { type: "STRING", created: true, updated: true  },
            SE_7_14: { type: "STRING", created: true, updated: true  },
            SE_7_15: { type: "STRING", created: true, updated: true  },
            SE_7_text: { type: "STRING", created: true, updated: true  },
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