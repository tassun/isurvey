import { KnDBConnector } from 'will-sql';
import { KnModel, KnContextInfo, KnDataSet, KnDataTable } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';

export class SurveyBYHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_BY";
    public model : KnModel = {
        name: "survey_by",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false },
            master_id: { type: "STRING", created: true, updated: false },
            parent_id: { type: "STRING", created: true, updated: false },
            survey_state: { type: "STRING", created: true, updated: false },
            SBY_1_text: { type: "STRING", created: true, updated: true  },
            SBY_2_text: { type: "STRING", created: true, updated: true  },
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
    
    public override async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await super.getDataAdd(context);
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.master_id = context.params.master_id;
        dt.dataset.parent_id = context.params.parent_id;
        return dt;
    }

    protected override processCalculate(context: KnContextInfo, db: KnDBConnector, data: KnDataSet, action?: string) : KnDataSet {
        if(action == "insert") {
            data.survey_state = "DRAFT";
        }
        return data;
    }

}
