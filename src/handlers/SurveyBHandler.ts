import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnModel, KnContextInfo, KnDataTable, KnDataCategory, KnValidateInfo } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';
import { SurveyProfileHandler } from './SurveyProfileHandler';

export class SurveyBHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_B";
    public alwaysSaveProfileForm : boolean = false;
    public readonly TABLE_NAMES : string[] = ["survey_b1","survey_b2","survey_b3","survey_b4","survey_b5","survey_b6","survey_b7"];
    public model : KnModel = {
        name: "survey_b",
        fields: {
            survey_id: { type: "STRING", key: true, created: true, updated: false  },
            profile_id: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            SB_profile: { type: "STRING", created: true, updated: false, remark: "survey_profile.profile_id" },
            SB_type: { type: "STRING", created: true, updated: false, remark: "A=Answerer,F=Family"  },
            SB_crime: { type: "STRING", created: true, updated: true },
            SB_remark: { type: "STRING", created: true, updated: true },
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
        dt.dataset.survey_id = uuid();
        let row = {survey_id: dt.dataset.survey_id, profile_id: dt.dataset.profile_id, master_id: dt.dataset.survey_id, SB_profile: dt.dataset.profile_id, SB_type: "A"};
        this.alwaysSaveProfileForm = true;
        let [rs,ds] = await this.doGet(context, row);
        if(rs.records==0) return Promise.reject(new VerifyError("Record not found",HTTP.NOT_FOUND,-16064));
        row  = {...row, ...rs.rows[0]};
        dt.dataset.rows = [row];
        dt.dataset.SB_counter = dt.dataset.rows.length;
        dt.entity = ds;
        return dt;
    }

    protected async doGet(context: KnContextInfo, data: any) : Promise<[KnRecordSet,KnDataCategory]> {
        let db = this.getPrivateConnector();
        try {
            let handler = new SurveyProfileHandler(this.logger);
            let ds = await handler.getDataCategory(context,db);    
            let profile_id = data.profile_id;
            let rs = await this.getRecordSet(context, db, profile_id);
            if(rs.records==0) {
                rs = await this.getProfileInfo(context, db, profile_id);
                if(rs.records>0) {
                    await this.doPersist(context, db, data);
                }
            }
            return Promise.resolve([rs,ds]);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
	}
    
    protected async doPersist(context: KnContextInfo, db: KnDBConnector, data: any) : Promise<KnRecordSet> {
        await db.beginWork();
        try {
            let rs = await this.processPersist(context, db, data);
            await db.commitWork();
            return Promise.resolve(rs);
        } catch(ex: any) {
            await db.rollbackWork();
            return Promise.reject(this.getDBError(ex));
        }
	}

    public async getProfileInfo(context: KnContextInfo, db: KnDBConnector, profile_id: string) : Promise<KnRecordSet> {
        let sql = new KnSQL();
        sql.append("select sp.A_02 AS age_code,sp.A_02_text AS SB_age,tgender.name_th AS SB_gender ");
        sql.append("from survey_profile sp ");
        sql.append("left join tgender on tgender.key_code = sp.A_01 ");
        sql.append("where sp.profile_id = ?profile_id ");
        sql.set("profile_id",profile_id);
        this.logger.info(this.constructor.name+".getProfileInfo:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async getRecordSet(context: KnContextInfo, db: KnDBConnector, profile_id: string) : Promise<KnRecordSet> {
        let sql = new KnSQL();
        sql.append("select sb.survey_id,sb.profile_id,sb.SB_profile,sb.SB_type,sb.SB_crime,sb.SB_remark,sb.create_millis,");
        sql.append("sp.A_02 AS age_code,sp.A_02_text AS SB_age,tgender.name_th AS SB_gender ");
        sql.append("from ").append(this.model.name).append(" sb ");
        sql.append("join survey_profile sp on sb.SB_profile = sp.profile_id ");
        sql.append("left join tgender on tgender.key_code = sp.A_01 ");
        sql.append("where sb.SB_profile = ?profile_id ");
        sql.set("profile_id",profile_id);
        this.logger.info(this.constructor.name+".getRecordSet:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async processPersist(context: KnContextInfo, db: KnDBConnector, data: any) : Promise<KnRecordSet> {
        data.survey_profile = data.SB_profile;
        data.SB_crime = null;
        data.SB_remark = null;
        data.form_id = this.form_id;
        this.ensureTimestamp(context, data);
        let rs = await this.performInsert(context, db, data);
        return Promise.resolve(rs);
    }

    public override async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        if(!this.model) return Promise.reject(new VerifyError("Model not found",HTTP.NOT_IMPLEMENTED,-16064));
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL();
        sql.append("select sb.survey_id,sb.profile_id,sb.SB_profile,sb.SB_type,sb.SB_crime,sb.SB_remark,sb.create_millis,");
        sql.append("sp.A_02 AS age_code,sp.A_02_text AS SB_age,tgender.name_th AS SB_gender ");
        sql.append("from ").append(this.model.name).append(" sb ");
        sql.append("join survey_profile sp on sb.SB_profile = sp.profile_id ");
        sql.append("left join tgender on tgender.key_code = sp.A_01 ");
        sql.append("where sb.profile_id = ?profile_id ");
        sql.append("order by SB_type, create_millis ");
        sql.set("profile_id",context.params.profile_id);
        this.logger.info(this.constructor.name+".processRetrieve:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async getDataEdit(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        if(rs.records==0) return this.recordNotFound();
        let dt = this.createDataTable("edit", rs);
        dt.dataset.profile_id = context.params.profile_id;
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.SB_counter = dt.dataset.rows.length; 
        if(dt.dataset.rows.length>0) {
            //parameter may be inconsistency then using current data
            dt.dataset.survey_id = dt.dataset.rows[0].survey_id;
        }
        let handler = new SurveyProfileHandler(this.logger);
        let ds = await handler.getDataCategory(context,db);    
        dt.entity = ds;
        return dt;
    }

    public override async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let master_id = context.params.master_id;
        let handler = new SurveyProfileHandler(this.logger);
        let rs = await handler.processInsert(context, db);
        if(rs.records>0) {
            let profile_id = rs.rows.profile_id;
            let survey_id = uuid();
            let data = {survey_id: survey_id, profile_id: master_id, master_id: survey_id, SB_profile: profile_id, SB_type: "F"};
            rs = await this.processPersist(context, db, data);
        }
        return Promise.resolve(rs);
    }

    public override async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        this.logger.info(this.constructor.name+".processUpdate: params",context.params);
        let rs = this.createRecordSet();
        let SB_surveys = context.params["SB_survey"];
        let SB_remarks = context.params["SB_remark"];
        if(SB_surveys && !Array.isArray(SB_surveys)) SB_surveys = [context.params.SB_survey];
        if(SB_remarks && !Array.isArray(SB_remarks)) SB_remarks = [context.params.SB_remark];
        for(let index = 0; index < SB_surveys.length; index++) {
            let item = SB_surveys[index];
            let sb_crime = context.params["SB_crime_"+index];
            let data = {survey_id: item, SB_crime: sb_crime, SB_remark: SB_remarks[index]};
            this.ensureTimestamp(context, data, false);
            let urs = await this.performUpdate(context, db, data);
            rs.records += urs.records;
        }
        return Promise.resolve(rs);
    }

    protected override async validateRequireFieldsInsert(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateCreator(context);
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16062));
        }
        return Promise.resolve(vi);
	}

    public override async processRemove(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let rs = await super.processRemove(context, db);
        let survey_id = context.params.survey_id;
        let sb_profile = context.params.SB_profile;
        if(sb_profile && sb_profile.trim().length>0) {
            let sql = new KnSQL();
            sql.append("delete from survey_profile where profile_id = ?profile_id ");
            sql.set("profile_id",sb_profile);
            this.logger.info(this.constructor.name+".processRemove:",sql);
            let srs = await sql.executeUpdate(db,context);
            this.logger.info(this.constructor.name+".processRemove:",srs);
        }
        for(let table of this.TABLE_NAMES) {
            let sql = new KnSQL();
            sql.append("delete from ").append(table).append(" where master_id = ?master_id ");
            sql.set("master_id",survey_id);
            this.logger.info(this.constructor.name+".processRemove:",sql);
            let srs = await sql.executeUpdate(db,context);
            this.logger.info(this.constructor.name+".processRemove:",srs);
        }
        return Promise.resolve(rs);
    }
    
}
