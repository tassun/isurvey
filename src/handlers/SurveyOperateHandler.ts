import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnValidateInfo, KnDataTable, KnDataSet } from '../models/AssureAlias';
import { OperateHandler } from '../base/OperateHandler';
import { SurveyProfileFormHandler } from './SurveyProfileFormHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';

export class SurveyOperateHandler extends OperateHandler {
    public form_id : string = "";
    public alwaysSaveProfileForm : boolean = true;

    public async saveProfileForm(context: KnContextInfo, db: KnDBConnector, data: any) : Promise<KnRecordSet> {
        let former = new SurveyProfileFormHandler(this.logger);
        let frs = await former.processUpdate(context,db,data);
        if(frs.records==0) {
            frs = await former.processInsert(context,db,data);
        }
        return Promise.resolve(frs);
    }

    public async removeProfileForm(context: KnContextInfo, db: KnDBConnector, data: any) : Promise<KnRecordSet> {
        let former = new SurveyProfileFormHandler(this.logger);
        let frs = await former.processRemove(context,db,data);
        return Promise.resolve(frs);
    }

    public async removeProfileFormBySurvey(context: KnContextInfo, db: KnDBConnector, survey_id: string) : Promise<KnRecordSet> {
        let sql = new KnSQL();
        sql.append("delete from survey_profile_form where survey_id = ?survey_id");
        sql.set("survey_id",survey_id);
        this.logger.info(this.constructor.name+".removeProfileFormBySurvey:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".removeProfileFormBySurvey:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    protected override validateRequireFields(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"profile_id","survey_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    protected override async validateRequireFieldsInsert(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"profile_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        vi = this.validateCreator(context);
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16062));
        }
        return Promise.resolve(vi);
	}

    protected validateCreator(context: KnContextInfo) : KnValidateInfo {
        let userid = context.meta?.user?.userid;
        if(!userid) userid = context.params?.userid;
        if(userid==undefined || userid==null || userid=="") {
            return {valid:false, info: "accessor" };
        }
        return {valid: true};
    }

    public override async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        if(!this.model) return Promise.reject(new VerifyError("Model not defined",HTTP.NOT_IMPLEMENTED,-16064));
        if(this.form_id.trim().length==0) return Promise.reject(new VerifyError("Form not defined",HTTP.NOT_IMPLEMENTED,-16065));
        let data = this.obtainParameterValues(context, this.model);
        let survey_id = data.survey_id;
        data.form_id = this.form_id;
        data.survey_id = uuid();
        if(survey_id && survey_id.trim().length>0) data.survey_id = survey_id;
        this.ensureTimestamp(context, data);
        this.processCalculate(context, db, data, "insert");
        let sql = this.composeQueryInsert(context,this.model,data);
        this.logger.info(this.constructor.name+".processInsert:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processInsert:",rs);
        if(rs.rows) {
            rs.rows.survey_id = data.survey_id;
            if(this.alwaysSaveProfileForm) {
                await this.saveProfileForm(context,db,data);
            }
        }
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        if(!this.model) return Promise.reject(new VerifyError("Model not found",HTTP.NOT_IMPLEMENTED,-16064));
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
        if(!this.model) return Promise.reject(new VerifyError("Model not found",HTTP.NOT_IMPLEMENTED,-16064));
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let data = this.obtainParameterValues(context, this.model);        
        this.ensureTimestamp(context, data, false);
        this.processCalculate(context, db, data, "update");
        let sql = this.composeQueryUpdate(context,this.model,data);
        this.logger.info(this.constructor.name+".processUpdate:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processUpdate:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRemove(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        if(!this.model) return Promise.reject(new VerifyError("Model not found",HTTP.NOT_IMPLEMENTED,-16064));
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

    public override async getDataView(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataView(context,db,rs);
        dt.dataset.profile_id = context.params.profile_id;
        return dt;
    }

    public override async getDataListing(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataListing(context,db,rs);
        dt.dataset.profile_id = context.params.profile_id;
        return dt;    
    }

    protected processCalculate(context: KnContextInfo, db: KnDBConnector, data: KnDataSet, action?: string) : KnDataSet {
        return data;
    }

}

