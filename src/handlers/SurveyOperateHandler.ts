import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnContextInfo } from '../models/AssureAlias';
import { OperateHandler } from '../base/OperateHandler';
import { SurveyProfileFormHandler } from './SurveyProfileFormHandler';

export class SurveyOperateHandler extends OperateHandler {

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

}

