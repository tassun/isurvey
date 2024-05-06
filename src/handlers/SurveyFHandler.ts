import { KnModel } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class SurveyFHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_F";
    public model : KnModel = {
        name: "survey_f",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            SF_1: { type: "STRING", created: true, updated: true  },
            SF_2_1: { type: "STRING", created: true, updated: true  },
            SF_2_2: { type: "STRING", created: true, updated: true  },
            SF_2_3: { type: "STRING", created: true, updated: true  },
            SF_2_4: { type: "STRING", created: true, updated: true  },
            SF_2_5: { type: "STRING", created: true, updated: true  },
            SF_2_6: { type: "STRING", created: true, updated: true  },
            SF_2_7: { type: "STRING", created: true, updated: true  },
            SF_2_8: { type: "STRING", created: true, updated: true  },
            SF_2_9: { type: "STRING", created: true, updated: true  },
            SF_2_10: { type: "STRING", created: true, updated: true  },
            SF_2_11: { type: "STRING", created: true, updated: true  },
            SF_2_12: { type: "STRING", created: true, updated: true  },
            SF_2_13: { type: "STRING", created: true, updated: true  },
            SF_2_text: { type: "STRING", created: true, updated: true  },
            SF_3: { type: "STRING", created: true, updated: true  },
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
