import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo, KnDataTable, KnValidateInfo } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';

export class SurveyMasterHandler extends SurveyOperateHandler {

    protected async validateRequireFieldsList(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"master_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public override async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        if(this.model?.name) {
            await this.validateRequireFieldsList(context,true);
            let master_id = context.params.master_id;
            let sql = new KnSQL();
            sql.append("select * from ").append(this.model.name).append(" where master_id = ?master_id ");
            sql.set("master_id",master_id);
            this.logger.info(this.constructor.name+".processList:",sql);
            let rs = await sql.executeQuery(db,context);
            return Promise.resolve(this.createRecordSet(rs));
        }
        return this.notImplementation();
    }

    public override async getDataListing(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataListing(context,db,rs);
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.master_id = context.params.master_id;
        dt.dataset.main_id = context.params.main_id;
        return Promise.resolve(dt);    
    }

    public override async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await super.getDataAdd(context);
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.master_id = context.params.master_id;
        dt.dataset.main_id = context.params.main_id;
        return Promise.resolve(dt);
    }

    public override async getDataEdit(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataEdit(context,db,rs);
        dt.dataset.main_id = context.params.main_id;
        return dt;
    }

    public async updateCrime(context: KnContextInfo, db: KnDBConnector, survey_id: string, crime: string = "1") : Promise<KnRecordSet> {
        if(!survey_id || survey_id.trim().length==0) return Promise.reject(this.createRecordSet());
        let sql = new KnSQL();
        sql.append("update survey_b set SB_crime = ?SB_crime where survey_id = ?survey_id ");
        sql.set("SB_crime",crime);
        sql.set("survey_id",survey_id);
        this.logger.info(this.constructor.name+".updateCrime:",sql);
        let rs = await sql.executeUpdate(db,context);
        this.logger.info(this.constructor.name+".updateCrime:",rs);
        return this.createRecordSet(rs);
    }

    public override async processInsert(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let master_id = context.params.master_id;
        let rs = await super.processInsert(context, db);        
        await this.updateCrime(context, db, master_id, "1");
        return Promise.resolve(rs);
    }

    public override async processUpdate(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        let master_id = context.params.master_id;
        let rs = await super.processUpdate(context, db);
        await this.updateCrime(context, db, master_id, "1");
        return Promise.resolve(rs);
    }

}
