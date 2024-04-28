import { v4 as uuid } from 'uuid';
import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnModel, KnValidateInfo } from '../models/AssureAlias';
import { OperateHandler } from '../base/OperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';

export class UserHandler extends OperateHandler {

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
            editable: { type: "STRING", calculated: true },
        }
    };

    protected override validateRequireFields(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"userid");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public override async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let data = this.obtainParameterValues(context, this.model);
        let userid = data.userid;
        data.userid = uuid();
        if(userid && userid.trim().length>0) data.userid = userid;
        this.ensureTimestamp(context, data);
        let sql = new KnSQL();
        sql.append("insert into ").append(this.model.name);
        sql.append(" (userid,username,password,level,name,surname,email,mobile,create_date,create_time,create_millis,create_by,update_date,update_time,update_millis,update_by) ");
        sql.append("values (?userid,?username,?password,?level,?name,?surname,?email,?mobile,?create_date,?create_time,?create_millis,?create_by,?update_date,?update_time,?update_millis,?update_by)");
        this.assignParameterValues(sql, data, this.model);
        this.logger.info(this.constructor.name+".processInsert:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processInsert:",rs);
        if(rs.rows) {
            rs.rows.userid = data.userid;
        }
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRetrieve(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL();
        sql.append("select * from ").append(this.model.name).append(" where userid = ?userid");
        sql.set("userid",context.params.userid);
        this.logger.info(this.constructor.name+".processRetrieve:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let data = this.obtainParameterValues(context, this.model);
        this.ensureTimestamp(context, data, false);
        let sql = new KnSQL();
        sql.append("update ").append(this.model.name).append(" set username=?username, level=?level, name=?name, surname=?surname, email=?email, mobile=?mobile, ");
        if(data.editable=="1") sql.append("password=?password, ");
        sql.append("update_date=?update_date, update_time=?update_time, update_millis=?update_millis, update_by=?update_by ");
        sql.append("where userid = ?userid");
        this.assignParameterValues(sql, data, this.model);
        this.logger.info(this.constructor.name+".processUpdate:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processUpdate:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processRemove(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let vi = await this.validateRequireFields(context);
        if(!vi.valid) return Promise.resolve(this.createRecordSet());
        let sql = new KnSQL();
        sql.append("delete from ").append(this.model.name).append(" where userid = ?userid");
        sql.set("userid",context.params.userid);
        this.logger.info(this.constructor.name+".processRemove:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.debug(this.constructor.name+".processRemove:",rs);
        return Promise.resolve(this.createRecordSet(rs));
    }

    public override async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let sql = new KnSQL();
        sql.append("select userid,username,password,level,name,surname,email,mobile ");
        sql.append("from ").append(this.model.name).append(" order by username");
        this.logger.info(this.constructor.name+".processList:",sql);
        let rs = await sql.executeQuery(db,context);
        return Promise.resolve(this.createRecordSet(rs));
    }

}
