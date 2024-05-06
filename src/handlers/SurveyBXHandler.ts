import { KnDBConnector, KnRecordSet, KnSQL } from 'will-sql';
import { KnModel, KnContextInfo, KnDataTable, KnValidateInfo } from '../models/AssureAlias';
import { SurveyOperateHandler } from './SurveyOperateHandler';
import { VerifyError } from '../models/VerifyError';
import { HTTP } from '../api/HTTP';

export class SurveyBXHandler extends SurveyOperateHandler {
    public readonly form_id : string = "SURVEY_BX";
    public readonly alwaysSaveProfileForm : boolean = false;
    public readonly TABLE_NAMES : string[] = ["survey_b1","survey_b2","survey_b3","survey_b4","survey_b5","survey_b6","survey_b7"];
    public model : KnModel = {
        name: "survey_bx",
        fields: {
            survey_id: { type: "STRING", key: true, calculated: true  },
            profile_id: { type: "STRING", calculated: true },
            master_id: { type: "STRING", calculated: true }
        }
    };

    protected async validateRequireFieldsList(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        let vi = this.validateParameters(context.params,"survey_id");
        if(!vi.valid && throwError) {
            return Promise.reject(new VerifyError("Parameter not found ("+vi.info+")",HTTP.NOT_ACCEPTABLE,-16061));
        }
        return Promise.resolve(vi);
    }

    public override async processList(context: KnContextInfo, db: KnDBConnector) : Promise<KnRecordSet> {
        await this.validateRequireFieldsList(context,true);
        let survey_id = context.params.survey_id;
        let sql = new KnSQL();
        sql.append("select * from survey_b where survey_id = ?survey_id ");
        sql.set("survey_id",survey_id);
        this.logger.info(this.constructor.name+".processList:",sql);
        let rs = await sql.executeQuery(db,context);
        let rs2 = this.createRecordSet(rs);
        if(rs2.records==0) {
            return this.recordNotFound();
        }        
        return Promise.resolve(rs2);
    }

    public override async getDataListing(context: KnContextInfo, db: KnDBConnector, rs: KnRecordSet) : Promise<KnDataTable> {
        let dt = await super.getDataListing(context,db,rs);
        let survey_id = context.params.survey_id;
        dt.dataset.survey_id = survey_id;
        let sql = new KnSQL();
        for(let table of this.TABLE_NAMES) {
            sql.clear();
            sql.append("SELECT successed,COUNT(*) as counter from ").append(table);
            sql.append(" where master_id = ?master_id ");
            sql.append("GROUP BY successed ");
            sql.set("master_id",survey_id);
            let rs = await sql.executeQuery(db,context);
            if(rs.rows && rs.rows.length>0) {
                for(let row of rs.rows) {
                    if(row.successed=="1") {
                        dt.dataset[table+"_success"] = row.counter;
                    } else {
                        dt.dataset[table+"_unsuccess"] = row.counter;
                    }
                }
            }
        }
        return Promise.resolve(dt);    
    }

}
