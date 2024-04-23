import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnModel, KnValidateInfo, KnDataTable } from '../models/AssureAlias';
import { ProcessHandler } from './ProcessHandler';
import { Utilities } from 'will-util';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';

export class UserHandler extends ProcessHandler {

    public model : KnModel = {
        name: "tusers",
        fields: {
            userid: { type: "STRING", key: true },
            username: { type: "STRING" },
            password: { type: "STRING" },
            level: { type: "STRING" },
            name: { type: "STRING" },
            surname: { type: "STRING" },
            email: { type: "STRING" },
            mobile: { type: "STRING" },
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

    protected validateRequireFields(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"userid");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let data = this.obtainParameterValues(context, this.model);
        let userid = data.userid;
        let now = Utilities.now();
        data.userid = uuid();
        if(userid && userid.trim().length>0) data.userid = userid;
        data.create_date = now;
        data.create_time = now;
        data.create_millis = now.getTime();
        data.create_by = context.meta?.user?.userid;
        data.update_date = now;
        data.update_time = now;
        data.update_millis = now.getTime();
        data.update_by = context.meta?.user?.userid;
        let sql = new KnSQL("insert into tusers (userid,username,password,level,name,surname,email,mobile,create_date,create_time,create_millis,create_by,update_date,update_time,update_millis,update_by) ");
        sql.append("values (?userid,?username,?password,?level,?name,?surname,?email,?mobile,?create_date,?create_time,?create_millis,?create_by,?update_date,?update_time,?update_millis,?update_by)");
        this.obtainParameters(sql, data, this.model);
        this.logger.info(this.constructor.name+".processInsert:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processInsert:",rs);
        if(rs.rows) {
            rs.rows.userid = data.userid;
        }
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL("select * from tusers where userid = ?userid");
        sql.set("userid",context.params.userid);
        this.logger.info(this.constructor.name+".processRetrieve:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let data = this.obtainParameterValues(context, this.model);
        let now = Utilities.now();
        data.update_date = now;
        data.update_time = now;
        data.update_millis = now.getTime();
        data.update_by = context.meta?.user?.userid;
        let sql = new KnSQL();
        sql.append("update tusers set level=?level, name=?name, surname=?surname, email=?email, mobile=?mobile, ");
        sql.append("update_date=?update_date, update_time=?update_time, update_millis=?update_millis, update_by=?update_by ");
        sql.append("where userid = ?userid");
        this.obtainParameters(sql, data, this.model);
        this.logger.info(this.constructor.name+".processUpdate:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processUpdate:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async processRemove(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL();
        sql.append("delete from tusers where userid = ?userid");
        sql.set("userid",context.params.userid);
        this.logger.info(this.constructor.name+".processRemove:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processRemove:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let sql = new KnSQL("select userid,username,password,level,name,surname,email,mobile ");
        sql.append("from tusers order by username");
        this.logger.info(this.constructor.name+".processList:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

}
