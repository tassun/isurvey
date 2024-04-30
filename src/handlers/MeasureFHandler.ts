import { KnModel } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class MeasureFHandler extends SurveyOperateHandler {
    public readonly form_id : string = "MEASURE_F";
    public model : KnModel = {
        name: "measure_f",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: true  },
            profile_id: { type: "STRING", created: true },
            MF_1: { type: "STRING", created: true, updated: true  },
            MF_2: { type: "STRING", created: true, updated: true  },
            MF_3: { type: "STRING", created: true, updated: true  },
            MF_4: { type: "STRING", created: true, updated: true  },
            MF_5: { type: "STRING", created: true, updated: true  },
            MF_6: { type: "STRING", created: true, updated: true  },
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
