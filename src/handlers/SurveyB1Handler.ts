import { KnModel } from '../models/AssureAlias';
import { SurveyMasterHandler } from './SurveyMasterHandler';

export class SurveyB1Handler extends SurveyMasterHandler {
    public readonly form_id : string = "SURVEY_B1";
    public readonly alwaysSaveProfileForm : boolean = false;
    public model : KnModel = {
        name: "survey_b1",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            master_id: { type: "STRING", created: true, updated: false, remark: "survey_b.survey_id" },
            fault_status: { type: "STRING", created: true, updated: true  },
            fault_behavior: { type: "STRING", created: true, updated: true  },
            fault_type: { type: "STRING", created: true, updated: true  },
            fault_nature: { type: "STRING", created: true, updated: true  },
            fault_nature_text: { type: "STRING", created: true, updated: true  },
            fault_relation: { type: "STRING", created: true, updated: true  },
            fault_relation_text: { type: "STRING", created: true, updated: true  },
            fault_location: { type: "STRING", created: true, updated: true  },
            fault_location_text: { type: "STRING", created: true, updated: true  },
            SB1_2_1: { type: "STRING", created: true, updated: true  },
            SB1_2_2_1: { type: "STRING", created: true, updated: true  },
            SB1_2_2_2: { type: "STRING", created: true, updated: true  },
            SB1_2_2_3: { type: "STRING", created: true, updated: true  },
            SB1_2_2_4: { type: "STRING", created: true, updated: true  },
            SB1_2_2_text: { type: "STRING", created: true, updated: true  },
            SB1_2_3_1: { type: "STRING", created: true, updated: true  },
            SB1_2_3_2: { type: "STRING", created: true, updated: true  },
            SB1_2_3_3: { type: "STRING", created: true, updated: true  },
            SB1_2_3_4: { type: "STRING", created: true, updated: true  },
            SB1_2_3_5: { type: "STRING", created: true, updated: true  },
            SB1_2_3_6: { type: "STRING", created: true, updated: true  },
            SB1_2_3_7: { type: "STRING", created: true, updated: true  },
            SB1_2_3_8: { type: "STRING", created: true, updated: true  },
            SB1_2_3_9: { type: "STRING", created: true, updated: true  },
            SB1_2_3_10: { type: "STRING", created: true, updated: true  },
            SB1_2_3_11: { type: "STRING", created: true, updated: true  },
            SB1_2_3_12: { type: "STRING", created: true, updated: true  },
            SB1_2_3_13: { type: "STRING", created: true, updated: true  },
            SB1_2_3_14: { type: "STRING", created: true, updated: true  },
            SB1_2_3_15: { type: "STRING", created: true, updated: true  },
            SB1_2_3_16: { type: "STRING", created: true, updated: true  },
            SB1_2_3_17: { type: "STRING", created: true, updated: true  },
            SB1_2_3_18: { type: "STRING", created: true, updated: true  },
            SB1_2_3_text: { type: "STRING", created: true, updated: true  },
            SB1_2_4: { type: "STRING", created: true, updated: true  },
            SB1_2_4_text: { type: "STRING", created: true, updated: true  },
            SB1_3_1: { type: "STRING", created: true, updated: true  },
            SB1_3_2_1: { type: "STRING", created: true, updated: true  },
            SB1_3_2_2: { type: "STRING", created: true, updated: true  },
            SB1_3_2_3: { type: "STRING", created: true, updated: true  },
            SB1_3_2_3_text: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_1: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_1_text: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_2: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_2_text: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_3: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_3_text: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_4: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_4_text: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_5: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_5_text: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_6: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_6_text: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_7: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_7_text: { type: "STRING", created: true, updated: true  },
            SB1_3_2_4_8: { type: "STRING", created: true, updated: true  },            
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
