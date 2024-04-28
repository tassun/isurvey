import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnModel, KnValidateInfo, KnDataTable } from '../models/AssureAlias';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';
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

    public override async insert(context: KnContextInfo) : Promise<KnRecordSet> {
        let vi = this.validateParameters(context.params,"profile_id");
        if(!vi.valid) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return this.doInsert(context);
	}

    protected override validateRequireFields(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"profile_id","survey_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public override async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let data = this.obtainParameterValues(context, this.model);
        let survey_id = data.survey_id;
        data.form_id = this.form_id;
        data.survey_id = uuid();
        if(survey_id && survey_id.trim().length>0) data.survey_id = survey_id;
        this.ensureTimestamp(context, data);
        let sql = this.composeQueryInsert(context,this.model,data);
        this.logger.info(this.constructor.name+".processInsert:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processInsert:",rs);
        if(rs.rows) {
            rs.rows.survey_id = data.survey_id;
            await this.saveProfileForm(context,db,data);
        }
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL();
        sql.append("select * from ").append(this.model.name).append(" where survey_id = ?survey_id");
        sql.set("survey_id",context.params.survey_id);
        this.logger.info(this.constructor.name+".processRetrieve:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let data = this.obtainParameterValues(context, this.model);
        this.ensureTimestamp(context, data, false);
        let sql = this.composeQueryUpdate(context,this.model,data);
        this.logger.info(this.constructor.name+".processUpdate:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processUpdate:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRemove(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = this.composeQueryDelete(context,this.model);
        this.logger.info(this.constructor.name+".processRemove:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processRemove:",rs);
        await this.removeProfileFormBySurvey(context,db,context.params.survey_id);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await super.getDataAdd(context);
        dt.dataset.profile_id = context.params.profile_id;
        return dt;
    }

    public override async getDataEdit(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataEdit(context,db,rs);
        dt.dataset.profile_id = context.params.profile_id;
        return dt;
    }

}
