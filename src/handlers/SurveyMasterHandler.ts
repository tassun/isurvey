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
        let survey_id = context.params.survey_id;
        let master_id = context.params.master_id;
        dt.dataset.survey_id = survey_id;
        dt.dataset.master_id = master_id;
        return Promise.resolve(dt);    
    }

    public override async getDataAdd(context: KnContextInfo) : Promise<KnDataTable> {
        let dt = await super.getDataAdd(context);
        dt.dataset.survey_id = context.params.survey_id;
        dt.dataset.master_id = context.params.master_id;
        return Promise.resolve(dt);
    }

}
