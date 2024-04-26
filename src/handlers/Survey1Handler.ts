import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnModel, KnValidateInfo, KnDataTable, KnDataCategory } from '../models/AssureAlias';
import { OperateHandler } from '../base/OperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';
import { DataHandler } from '../base/DataHandler';
import { Utilities } from 'will-util';

export class Survey1Handler extends OperateHandler {

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

    public override async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let data = this.obtainParameterValues(context, this.model);
        let profile_id = data.profile_id;
        data.profile_id = uuid();
        if(profile_id && profile_id.trim().length>0) data.profile_id = profile_id;
        let profile_code = data.profile_code;
        data.profile_code = Utilities.serializeTimestamp(Utilities.now());
        if(profile_code && profile_code.trim().length>0) data.profile_code = profile_code;
        data.survey_form = "1";
        data.survey_status = "uncompleted";
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

    public override async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL();
        sql.append("select s.*,concat(tusers.name,' ',tusers.surname) AS creator_name from ").append(this.model.name).append(" s ");
        sql.append("left join tusers on tusers.userid = s.create_by ");
        sql.append("where s.profile_id = ?profile_id ");
        sql.set("profile_id",context.params.profile_id);
        this.logger.info(this.constructor.name+".processRetrieve:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let data = this.obtainParameterValues(context, this.model);
        if(!data.profile_code || data.profile_code.trim().length==0) data.profile_code = Utilities.serializeTimestamp(Utilities.now());
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
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let userid = context.params.userid || context.meta?.user?.userid;
        let sql = new KnSQL();
        sql.append("select s.profile_id,s.profile_code,s.A2 AS house_no,if(s.A4='1',s.A4_1_1_text,s.A4_2_1_text) AS province_name,");
        sql.append("s.A_01 AS gender_code,s.A_02 AS age_code,s.A_02_text AS ages,if(s.create_by=?userid,'1','0') as ownered,");
        sql.append("tgender.name_th AS gender_name,concat(tusers.name,' ',tusers.surname) AS creator_name ");
        sql.append("from ").append(this.model.name).append(" s ");
        sql.append("left join tgender on tgender.code = s.A_01 ");
        sql.append("left join tusers on tusers.userid = s.create_by ");
        sql.append("where s.master_id is null or s.master_id = '' ");
        sql.append("order by profile_code desc ");
        sql.set("userid",userid);
        this.logger.info(this.constructor.name+".processList:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    protected async getDataCategory(context: KnContextInfo, db: KnDBConnector) : Promise<KnDataCategory> {
        let handler = new DataHandler(this.logger);
        return await handler.getCategory(context,db,"tprovinces","tamphures","tdistricts");
    }

    public override async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await super.getDataAdd(context);
        dt.dataset.creator_name = context.meta?.user?.name+" "+context.meta?.user?.surname;
        dt.dataset.profile_code = Utilities.serializeTimestamp(Utilities.now());
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
        let ds = await this.getDataCategory(context,db);
        dt.entity = ds;
        return dt;
    }

}
