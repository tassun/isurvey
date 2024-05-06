import { KnModel } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class SurveyCHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_C";
    public model : KnModel = {
        name: "survey_c",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            SC_1_1: { type: "STRING", created: true, updated: true  },
            SC_1_2: { type: "STRING", created: true, updated: true  },
            SC_1_3: { type: "STRING", created: true, updated: true  },
            SC_2_1: { type: "STRING", created: true, updated: true  },
            SC_2_2: { type: "STRING", created: true, updated: true  },
            SC_2_3: { type: "STRING", created: true, updated: true  },
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
