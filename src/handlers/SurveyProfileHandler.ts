import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnModel, KnValidateInfo, KnDataTable, KnDataCategory, KnDataSet } from '../models/AssureAlias';
import { OperateHandler } from '../base/OperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';
import { DataHandler } from '../base/DataHandler';
import { Utilities } from 'will-util';
import { SurveyFamilyHandler } from './SurveyFamilyHandler';

export class SurveyProfileHandler extends OperateHandler {

    public model : KnModel = {
        name: "survey_profile",
        fields: {
            profile_id: { type: "STRING", key: true, created: true, updated: true },
            master_id: { type: "STRING", created: true, updated: true },
            profile_code: { type: "STRING", created: true, updated: true },
            A2: { type: "STRING", created: true, updated: true},
            A3: { type: "STRING", created: true, updated: true },
            A4: { type: "STRING", created: true, updated: true },
            A4_1_1: { type: "STRING", created: true, updated: true },
            A4_1_1_text: { type: "STRING", created: true, updated: true },
            A4_1_2: { type: "STRING", created: true, updated: true },
            A4_1_2_text: { type: "STRING", created: true, updated: true },
            A4_1_3: { type: "STRING", created: true, updated: true },
            A4_1_3_text: { type: "STRING", created: true, updated: true },
            A4_1_4: { type: "STRING", created: true, updated: true },
            A4_2_1: { type: "STRING", created: true, updated: true },
            A4_2_1_text: { type: "STRING", created: true, updated: true },
            A4_2_2: { type: "STRING", created: true, updated: true },
            A4_2_2_text: { type: "STRING", created: true, updated: true },
            A4_2_3: { type: "STRING", created: true, updated: true },
            A4_2_3_text: { type: "STRING", created: true, updated: true },
            A4_2_4: { type: "STRING", created: true, updated: true },
            A4_2_5: { type: "STRING", created: true, updated: true },
            A_01: { type: "STRING", created: true, updated: true },
            A_02: { type: "STRING", created: true, updated: true },
            A_02_text: { type: "STRING", created: true, updated: true },
            A_02_1: { type: "STRING", created: true, updated: true },
            A_02_2: { type: "STRING", created: true, updated: true },
            A_02_3: { type: "STRING", created: true, updated: true },
            A_02_4: { type: "STRING", created: true, updated: true },
            A_02_5: { type: "STRING", created: true, updated: true },
            A_02_6: { type: "STRING", created: true, updated: true },
            A_02_7: { type: "STRING", created: true, updated: true },
            A_02_8: { type: "STRING", created: true, updated: true },
            A_02_9: { type: "STRING", created: true, updated: true },
            A_02_10: { type: "STRING", created: true, updated: true },
            A_02_11: { type: "STRING", created: true, updated: true },
            A_02_12: { type: "STRING", created: true, updated: true },
            A_02_13: { type: "STRING", created: true, updated: true },
            A_02_14: { type: "STRING", created: true, updated: true },
            A_02_15: { type: "STRING", created: true, updated: true },
            A_02_16: { type: "STRING", created: true, updated: true },
            A_03: { type: "STRING", created: true, updated: true },
            A_04: { type: "STRING", created: true, updated: true },
            A_05: { type: "STRING", created: true, updated: true },
            A_05_text: { type: "STRING", created: true, updated: true },
            A_06: { type: "STRING", created: true, updated: true },
            A_06_text: { type: "STRING", created: true, updated: true },
            A_07: { type: "STRING", created: true, updated: true },
            A_07_text: { type: "STRING", created: true, updated: true },
            A_08: { type: "STRING", created: true, updated: true },
            A_08_text: { type: "STRING", created: true, updated: true },
            A_08_N: { type: "STRING", created: true, updated: true },
            A_08_N_text: { type: "STRING", created: true, updated: true },
            A_09: { type: "STRING", created: true, updated: true },
            A_09_01: { type: "STRING", created: true, updated: true },
            A_09_02: { type: "STRING", created: true, updated: true },
            A_09_03: { type: "STRING", created: true, updated: true },
            A_09_04: { type: "STRING", created: true, updated: true },
            A_09_05: { type: "STRING", created: true, updated: true },
            A_09_06: { type: "STRING", created: true, updated: true },
            A_09_07: { type: "STRING", created: true, updated: true },
            A_09_08: { type: "STRING", created: true, updated: true },
            A_09_09: { type: "STRING", created: true, updated: true },
            A_09_text: { type: "STRING", created: true, updated: true },
            A_10: { type: "STRING", created: true, updated: true },
            A_10_text: { type: "STRING", created: true, updated: true },
            A_11: { type: "STRING", created: true, updated: true },
            A_12: { type: "STRING", created: true, updated: true },
            A_12_text: { type: "STRING", created: true, updated: true },
            A_13: { type: "STRING", created: true, updated: true },
            A_13_text: { type: "STRING", created: true, updated: true },
            A_14: { type: "STRING", created: true, updated: true },
            A_14_01: { type: "STRING", created: true, updated: true },
            A_14_02: { type: "STRING", created: true, updated: true },
            A_14_03: { type: "STRING", created: true, updated: true },
            A_14_04: { type: "STRING", created: true, updated: true },
            A_14_05: { type: "STRING", created: true, updated: true },
            A_14_06: { type: "STRING", created: true, updated: true },
            A_14_07: { type: "STRING", created: true, updated: true },
            A_14_08: { type: "STRING", created: true, updated: true },
            A_14_09: { type: "STRING", created: true, updated: true },
            A_14_10: { type: "STRING", created: true, updated: true },
            A_14_11: { type: "STRING", created: true, updated: true },
            A_14_12: { type: "STRING", created: true, updated: true },
            A_14_13: { type: "STRING", created: true, updated: true },
            A_14_14: { type: "STRING", created: true, updated: true },
            A_14_15: { type: "STRING", created: true, updated: true },
            A_14_16: { type: "STRING", created: true, updated: true },
            A_14_17: { type: "STRING", created: true, updated: true },
            A_14_18: { type: "STRING", created: true, updated: true },
            A_14_19: { type: "STRING", created: true, updated: true },
            survey_status: { type: "STRING", created: true, updated: false },
            survey_form: { type: "STRING", created: true, updated: false },
            create_date: { type: "DATE", created: true, updated: false },
            create_time: { type: "TIME", created: true, updated: false },
            create_millis: { type: "BIGINT", created: true, updated: false },
            create_by: { type: "STRING", created: true, updated: false },
            update_date: { type: "DATE", created: true, updated: true },
            update_time: { type: "TIME", created: true, updated: true },
            update_millis: { type: "BIGINT", created: true, updated: true },
            update_by: { type: "STRING", created: true, updated: true },
            creator_name: { type: "STRING", calculated: true },
        }
    };

    protected override async validateRequireFields(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"profile_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public async updateFamily(context: KnContextInfo, db: KnDBConnector, data: any) : Promise<KnRecordSet> {
        data.survey_id = context.params.survey_id;
        data.SB_profile = data.profile_id;
        data.SB_gender = data.A_01;
        data.SB_age = data.A_02;
        data.SB_age_text = data.A_02_text;
        let handler = new SurveyFamilyHandler(this.logger);
        let frs = await handler.performUpdate(context,db,data);
        return Promise.resolve(frs);
    }

    public override async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let data = this.obtainParameterValues(context, this.model);
        let profile_id = data.profile_id;
        data.profile_id = uuid();
        if(profile_id && profile_id.trim().length>0) data.profile_id = profile_id;
        let profile_code = data.profile_code;
        data.profile_code = Utilities.serializeTimestamp(Utilities.now());
        if(profile_code && profile_code.trim().length>0) data.profile_code = profile_code;
        this.ensureTimestamp(context, data);
        this.processCalculate(context, db, data);
        let sql = this.composeQueryInsert(context,this.model,data);
        this.logger.info(this.constructor.name+".processInsert:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processInsert:",rs);
        if(rs.rows) {
            rs.rows.profile_id = data.profile_id;
        }
        await this.updateFamily(context,db,data);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async getRecordSet(context: KnContextInfo, db: KnDBConnector,profile_id: string = context.params.profile_id) : Promise<KnRecordSet> {
        if(!profile_id || profile_id.trim().length==0) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL();
        sql.append("select s.*,concat(tusers.name,' ',tusers.surname) AS creator_name from ").append(this.model.name).append(" s ");
        sql.append("left join tusers on tusers.userid = s.create_by ");
        sql.append("where s.profile_id = ?profile_id ");
        sql.set("profile_id",profile_id);
        this.logger.info(this.constructor.name+".getRecordSet:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let rs = await this.getRecordSet(context,db);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let data = this.obtainParameterValues(context, this.model);
        if(!data.profile_code || data.profile_code.trim().length==0) data.profile_code = Utilities.serializeTimestamp(Utilities.now());
        this.ensureTimestamp(context, data, false);
        this.processCalculate(context, db, data);
        let sql = this.composeQueryUpdate(context,this.model,data);
        this.logger.info(this.constructor.name+".processUpdate:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processUpdate:",rs);
        await this.updateFamily(context,db,data);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRemove(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = this.composeQueryDelete(context,this.model);
        this.logger.info(this.constructor.name+".processRemove:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processRemove:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let userid = context.params.userid || context.meta?.user?.userid;
        let sql = new KnSQL();
        sql.append("select s.profile_id,s.profile_code,s.A2 AS house_no,if(s.A4='1',s.A4_1_1_text,s.A4_2_1_text) AS province_name,");
        sql.append("s.A_01 AS gender_code,s.A_02 AS age_code,s.A_02_text AS ages,if(s.create_by=?userid,'1','0') as ownered,");
        sql.append("tgender.name_th AS gender_name,concat(tusers.name,' ',tusers.surname) AS creator_name ");
        sql.append("from ").append(this.model.name).append(" s ");
        sql.append("left join tgender on tgender.key_code = s.A_01 ");
        sql.append("left join tusers on tusers.userid = s.create_by ");
        sql.append("where s.master_id is null or s.master_id = '' ");
        sql.append("order by profile_code desc ");
        sql.set("userid",userid);
        this.logger.info(this.constructor.name+".processList:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async getDataCategory(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataCategory> {
        let handler = new DataHandler(this.logger);
        return await handler.getCategory(context,db,"tprovinces","tamphures","tdistricts");
    }

    public async createDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await super.getDataAdd(context);
        dt.dataset.master_id = context.params.master_id;
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.creator_name = "";
        if(context.meta?.user?.name) dt.dataset.creator_name = context.meta?.user?.name+" "+(context.meta?.user?.surname?context.meta?.user?.surname:"");
        dt.dataset.profile_code = Utilities.serializeTimestamp(Utilities.now());
        return dt;
    }

    public override async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await this.createDataAdd(context);
        let db = this.getPrivateConnector();
        try {
            let ds = await this.getDataCategory(context,db);
            dt.entity = ds;
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
        return dt;
    }

    public override async getDataEdit(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataEdit(context,db,rs);
        dt.dataset.survey_id = context.params.survey_id;
        let ds = await this.getDataCategory(context,db);
        dt.entity = ds;
        return dt;
    }

    protected processCalculate(context: KnContextInfo, db: KnDBConnector, data: KnDataSet) : KnDataSet {
        if(data.master_id=="") data.master_id = null;
        if(data.A4=="2") {
            data.A4_1_1 = undefined;
            data.A4_1_1_text = '';
        }
        let ageflag = data.A_02;
        let agetext = data.A_02_text;
        if(ageflag && ageflag=="0" && agetext && agetext.trim().length>0) {
            let ages = Utilities.parseInteger(agetext);
            if(!ages) ages = 0;
            if(ages<=17) data.A_02_1 = "1";
            else if(ages>=18 && ages<=19) data.A_02_2 = "1";
            else if(ages>=20 && ages<=24) data.A_02_3 = "1";
            else if(ages>=25 && ages<=29) data.A_02_4 = "1";
            else if(ages>=30 && ages<=34) data.A_02_5 = "1";
            else if(ages>=35 && ages<=39) data.A_02_6 = "1";
            else if(ages>=40 && ages<=44) data.A_02_7 = "1";
            else if(ages>=45 && ages<=49) data.A_02_8 = "1";
            else if(ages>=50 && ages<=54) data.A_02_9 = "1";
            else if(ages>=55 && ages<=59) data.A_02_10 = "1";
            else if(ages>=60 && ages<=64) data.A_02_11 = "1";
            else if(ages>=65 && ages<=69) data.A_02_12 = "1";
            else if(ages>=70 && ages<=74) data.A_02_13 = "1";
            else if(ages>=75 && ages<=79) data.A_02_14 = "1";
            else if(ages>=80 && ages<=89) data.A_02_15 = "1";
            else if(ages>=90) data.A_02_16 = "1";
        }
        return data;
    }

}
