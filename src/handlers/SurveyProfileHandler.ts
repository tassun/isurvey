import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnModel, KnValidateInfo, KnDataTable } from '../models/AssureAlias';
import { OperateHandler } from '../base/OperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';

export class SurveyProfileHandler extends OperateHandler {

    public model : KnModel = {
        name: "survey_profile",
        fields: {
            profile_id: { type: "STRING", key: true },
            master_id: { type: "STRING" },
            profile_code: { type: "STRING" },
            A2: { type: "STRING" },
            A3: { type: "STRING" },
            A4: { type: "STRING" },
            A4_1_1: { type: "STRING" },
            A4_1_2: { type: "STRING" },
            A4_1_3: { type: "STRING" },
            A4_1_4: { type: "STRING" },
            A4_2_1: { type: "STRING" },
            A4_2_2: { type: "STRING" },
            A4_2_3: { type: "STRING" },
            A4_2_4: { type: "STRING" },
            A4_2_5: { type: "STRING" },
            A_01: { type: "STRING" },
            A_02: { type: "STRING" },
            A_02_text: { type: "STRING" },
            A_03: { type: "STRING" },
            A_04: { type: "STRING" },
            A_05: { type: "STRING" },
            A_05_text: { type: "STRING" },
            A_06: { type: "STRING" },
            A_06_text: { type: "STRING" },
            A_07: { type: "STRING" },
            A_07_text: { type: "STRING" },
            A_08: { type: "STRING" },
            A_08_text: { type: "STRING" },
            A_08_N: { type: "STRING" },
            A_08_N_text: { type: "STRING" },
            A_09: { type: "STRING" },
            A_09_01: { type: "STRING" },
            A_09_02: { type: "STRING" },
            A_09_03: { type: "STRING" },
            A_09_04: { type: "STRING" },
            A_09_05: { type: "STRING" },
            A_09_06: { type: "STRING" },
            A_09_07: { type: "STRING" },
            A_09_08: { type: "STRING" },
            A_09_09: { type: "STRING" },
            A_09_text: { type: "STRING" },
            A_10: { type: "STRING" },
            A_10_text: { type: "STRING" },
            A_11: { type: "STRING" },
            A_12: { type: "STRING" },
            A_12_text: { type: "STRING" },
            A_13: { type: "STRING" },
            A_13_text: { type: "STRING" },
            A_14: { type: "STRING" },
            A_14_01: { type: "STRING" },
            A_14_02: { type: "STRING" },
            A_14_03: { type: "STRING" },
            A_14_04: { type: "STRING" },
            A_14_05: { type: "STRING" },
            A_14_06: { type: "STRING" },
            A_14_07: { type: "STRING" },
            A_14_08: { type: "STRING" },
            A_14_09: { type: "STRING" },
            A_14_10: { type: "STRING" },
            A_14_11: { type: "STRING" },
            A_14_12: { type: "STRING" },
            A_14_13: { type: "STRING" },
            A_14_14: { type: "STRING" },
            A_14_15: { type: "STRING" },
            A_14_16: { type: "STRING" },
            A_14_17: { type: "STRING" },
            A_14_18: { type: "STRING" },
            A_14_19: { type: "STRING" },
            survey_status: { type: "STRING" },
            survey_form: { type: "STRING" },
            create_date: { type: "DATE" },
            create_time: { type: "TIME" },
            create_millis: { type: "BIGINT" },
            create_by: { type: "STRING" },
            update_date: { type: "DATE" },
            update_time: { type: "TIME" },
            update_millis: { type: "BIGINT" },
            update_by: { type: "STRING" },
        }
    };

    protected override async doInsert(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processInsert(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
	}

    protected override async doRetrieve(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processRetrieve(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doUpdate(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processUpdate(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doRemove(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processRemove(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doList(context: KnContextInfo) : Promise<KnRecordSet> {
        let db = this.getPrivateConnector();
        try {
            return await this.processList(context, db);
        } catch(ex: any) {
            return Promise.reject(this.getDBError(ex));
        } finally {
            if(db) db.close();
        }
    }

    protected override async doEdit(context: KnContextInfo) : Promise<KnDataTable> {
        let rs = await this.doRetrieve(context);
        if(rs.rows && rs.rows.length>0) {
            let row = this.transformData(rs.rows[0]);
            return this.createDataTable("edit", row);
        }
        return this.recordNotFound();
    }

    protected override async validateRequireFields(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"profile_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let data = this.obtainParameterValues(context, this.model);
        let profile_id = data.profile_id;
        data.profile_id = uuid();
        if(profile_id && profile_id.trim().length>0) data.profile_id = profile_id;
        this.ensureTimestamp(context, data);
        let sql = this.composeQueryInsert(context,this.model,data);
        this.logger.info(this.constructor.name+".processInsert:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processInsert:",rs);
        if(rs.rows) {
            rs.rows.profile_id = data.profile_id;
        }
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL("select * from ").append(this.model.name).append(" where profile_id = ?profile_id");
        sql.set("profile_id",context.params.profile_id);
        this.logger.info(this.constructor.name+".processRetrieve:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
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

    public async processRemove(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = this.composeQueryDelete(context,this.model);
        this.logger.info(this.constructor.name+".processRemove:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processRemove:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let sql = new KnSQL();
        sql.append("select s.profile_id,s.profile_code,s.A2 AS house_no,if(s.A4='1',s.A4_1_1,s.A4_2_1) AS province_name,");
        sql.append("s.A_01 AS gender_code,s.A_02 AS age_code,s.A_02_text AS ages,s.create_by,tgender.name_th AS gender_name,concat(tusers.name,' ',tusers.surname) AS create_name ");
        sql.append("from ").append(this.model.name).append(" s ");
        sql.append("left join tgender on tgender.code = s.A_01 ");
        sql.append("left join tusers on tusers.userid = s.create_by ");
        sql.append("where master_id is null or master_id = '' ");
        sql.append("order by profile_code desc");
        this.logger.info(this.constructor.name+".processList:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

}
