import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnModel, KnValidateInfo } from '../models/AssureAlias';
import { OperateHandler } from '../base/OperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';

export class SurveyProfileFormHandler extends OperateHandler {

    public model : KnModel = {
        name: "survey_profile_form",
        fields: {
            profile_id: { type: "STRING", key: true, created: true, updated: false  },
            form_id: { type: "STRING", key: true, created: true, updated: false  },
            survey_id: { type: "STRING", created: true, updated: true  },
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
        let vi = this.validateParameters(context.params,"profile_id","form_id","survey_id");
        if(!vi.valid) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return this.doInsert(context);
	}

    protected override validateRequireFields(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"profile_id","form_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public override async processInsert(context: KnContextInfo, db: KnDBConnector, data?: any) : Promise<KnRecordSet> {
        if(!data) data = this.obtainParameterValues(context, this.model);
        this.ensureTimestamp(context, data);
        let sql = this.composeQueryInsert(context,this.model,data);
        this.logger.info(this.constructor.name+".processInsert:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processInsert:",rs);
        if(rs.rows) {
            rs.rows.survey_id = data.survey_id;
            rs.rows.form_id = data.form_id;
            rs.rows.profile_id = data.profile_id;
        }
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL();
        sql.append("select * from ").append(this.model.name).append(" where profile_id = ?profile_id and form_id = ?form_id");
        sql.set("survey_id",context.params.survey_id);
        sql.set("form_id",context.params.form_id);
        this.logger.info(this.constructor.name+".processRetrieve:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processUpdate(context: KnContextInfo, db: KnDBConnector, data?: any) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        if(!data) data = this.obtainParameterValues(context, this.model);
        this.ensureTimestamp(context, data, false);
        let sql = this.composeQueryUpdate(context,this.model,data);
        this.logger.info(this.constructor.name+".processUpdate:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processUpdate:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRemove(context: KnContextInfo, db: KnDBConnector, data?: any) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = this.composeQueryDelete(context,this.model,data);
        this.logger.info(this.constructor.name+".processRemove:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processRemove:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }
    
}
