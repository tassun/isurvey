import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnModel, KnContextInfo, KnDataTable, KnValidateInfo, KnDataSet } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';

export class SurveyDXHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_DX";
    public readonly alwaysSaveProfileForm : boolean = false;
    public model : KnModel = {
        name: "survey_dx",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            master_id: { type: "STRING", created: true, updated: false, remark: "survey_d.survey_id" },
            column_id: { type: "STRING", created: true, updated: false, remark: "survey_d column name" },
            survey_state: { type: "STRING", created: true, updated: false, remark: "DRAFT,CONFIRM,CANCEL" },
            SDX_1: { type: "STRING", created: true, updated: true  },
            SDX_2: { type: "STRING", created: true, updated: true  },
            SDX_3: { type: "STRING", created: true, updated: true  },
            SDX_4: { type: "STRING", created: true, updated: true  },
            SDX_5: { type: "STRING", created: true, updated: true  },
            SDX_6: { type: "STRING", created: true, updated: true  },
            SDX_6_text: { type: "STRING", created: true, updated: true  },
            SDX_7: { type: "STRING", created: true, updated: true  },
            SDX_7_text: { type: "STRING", created: true, updated: true  },
            SDX_8: { type: "STRING", created: true, updated: true  },
            SDX_8_text: { type: "STRING", created: true, updated: true  },
            SDX_9: { type: "STRING", created: true, updated: true  },
            SDX_9_text: { type: "STRING", created: true, updated: true  },
            SDX_10: { type: "STRING", created: true, updated: true  },
            SDX_10_text: { type: "STRING", created: true, updated: true  },
            SDX_11: { type: "STRING", created: true, updated: true  },
            SDX_11_text: { type: "STRING", created: true, updated: true  },
            SDX_12: { type: "STRING", created: true, updated: true  },
            SDX_12_text: { type: "STRING", created: true, updated: true  },
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

    protected override async validateRequireFieldsInsert(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        await super.validateRequireFieldsInsert(context,throwError);
        let vi = await this.validateRequireFieldsList(context,throwError);
        return Promise.resolve(vi);
    }

    protected async validateRequireFieldsList(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"master_id","column_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public override async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await super.getDataAdd(context);
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.master_id = context.params.master_id;
        dt.dataset.column_id = context.params.column_id;
        return Promise.resolve(dt);
    }

    public override async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        await this.validateRequireFieldsList(context,true);
        let master_id = context.params.master_id;
        let column_id = context.params.column_id;
        let sql = new KnSQL();
        sql.append("select profile_id,survey_id,master_id,column_id,");
        sql.append("SDX_1,SDX_2,create_millis ");
        sql.append("from ").append(this.model?.name);
        sql.append(" where master_id = ?master_id and column_id = ?column_id ");
        sql.append("order by create_millis ");
        sql.set("master_id",master_id);
        sql.set("column_id",column_id);
        this.logger.info(this.constructor.name+".processList:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async getDataListing(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataListing(context,db,rs);
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.master_id = context.params.master_id;
        dt.dataset.column_id = context.params.column_id;
        return Promise.resolve(dt);    
    }

    protected override processCalculate(context: KnContextInfo, db: KnDBConnector, data: KnDataSet, action?: string) : KnDataSet {
        if(action == "insert") {
            data.survey_state = "DRAFT";
        }
        return data;
    }

}
