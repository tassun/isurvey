import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnModel, KnContextInfo, KnDataTable, KnValidateInfo, KnDataSet } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';
import { SurveyProfileHandler } from './SurveyProfileHandler';
import { KnUtility } from '../utils/KnUtility';

export class SurveyFamilyHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_B";
    public alwaysSaveProfileForm : boolean = false;
    public model : KnModel = {
        name: "survey_b",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            SB_profile: { type: "STRING", created: true, updated: true, remark: "survey_profile.profile_id" },
            SB_type: { type: "STRING", created: true, updated: false, remark: "A=Answerer,F=Family"  },
            SB_crime: { type: "STRING", created: true, updated: false },
            SB_remark: { type: "STRING", created: true, updated: false },
            SB_gender: { type: "STRING", created: true, updated: true },
            SB_age: { type: "STRING", created: true, updated: true },
            SB_age_text: { type: "STRING", created: true, updated: true },
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

    protected override validateRequireFields(context: KnContextInfo, throwError: boolean = false, action?: string) : Promise<KnValidateInfo> {
        if("update"==action) return Promise.resolve({valid: true});
        let vi = this.validateParameters(context.params,"profile_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }
    
    public async processPersist(context: KnContextInfo, db: KnDBConnector, data: any) : Promise<KnRecordSet> {
        data.form_id = this.form_id;
        this.ensureTimestamp(context, data);
        let rs = await this.performUpdate(context, db, data);
        return Promise.resolve(rs);
    }

    public async getDataEdit(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt;
        let dts = await super.getDataEdit(context,db,rs);
        let sb_profile = context.params.SB_profile;
        let handler = new SurveyProfileHandler(this.logger);
        let prs = await handler.getRecordSet(context,db,sb_profile); 
        this.logger.debug(this.constructor.name+".getDataEdit: sb_profile",sb_profile,prs);
        if(prs.rows && prs.rows.length>0) {
            dt = this.createDataTable("edit", prs.rows[0]);
        } else {
            prs = await handler.getRecordSet(context,db,context.params.profile_id);
            this.logger.debug(this.constructor.name+".getDataEdit: profile_id",context.params.profile_id,prs);
            if(prs.rows && prs.rows.length>0) {
                dt = this.createDataTable("edit", prs.rows[0]);                
                KnUtility.removeAttributes(dt.dataset,"profile_id","A_02_1","A_02_2","A_02_3","A_02_4","A_02_5","A_02_6","A_02_7","A_02_8","A_02_9","A_02_10","A_02_11","A_02_12","A_02_13","A_02_14","A_02_15","A_02_16","A_03","A_04","A_05","A_05_text","A_06","A_06_text","A_07","A_07_text","A_08","A_08_text","A_08_N","A_08_N_text","A_09","A_09_01","A_09_02","A_09_03","A_09_04","A_09_05","A_09_06","A_09_07","A_09_08","A_09_09","A_09_text","A_10","A_10_text","A_11","A_12","A_12_text","A_13","A_13_text","A_14","A_14_01","A_14_02","A_14_03","A_14_04","A_14_05","A_14_06","A_14_07","A_14_08","A_14_09","A_14_10","A_14_11","A_14_12","A_14_13","A_14_14","A_14_15","A_14_16","A_14_17","A_14_18","A_14_19");
            } else {
                dt = await handler.createDataAdd(context);
            }
            dt.dataset.master_id = context.params.profile_id;
            dt.dataset.A_01 = dts.dataset.SB_gender;
            dt.dataset.A_02 = dts.dataset.SB_age;
            dt.dataset.A_02_text = dts.dataset.SB_age_text;
            dt.action = "add";
        }
        if(!dt) dt = dts;
        dt.dataset.survey_id = context.params.survey_id;
        let ds = await handler.getDataCategory(context,db);    
        dt.entity = ds;
        return dt;
    }

    public override async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        this.logger.info(this.constructor.name+".processUpdate: params",context.params);
        let data : KnDataSet = {survey_id: context.params.survey_id, SB_gender: context.params.A_01, SB_age: context.params.A_02, SB_age_text: context.params.A_02_text};
        let rs = this.createRecordSet();
        let handler = new SurveyProfileHandler(this.logger);
        let prs = await handler.getRecordSet(context,db);
        if(prs.records==0) {
            rs = await handler.processInsert(context,db);
            data.SB_profile = rs.rows.profile_id;
        } else {
            rs = await handler.processUpdate(context,db);
        }
        await this.processPersist(context,db,data);
        return Promise.resolve(rs);
    }

    protected override async validateRequireFieldsInsert(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateCreator(context);
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16062));
        }
        return Promise.resolve(vi);
	}

    protected override processCalculate(context: KnContextInfo, db: KnDBConnector, data: KnDataSet, action?: string) : KnDataSet {
        data.SB_type = "F";
        return data;
    }

}
