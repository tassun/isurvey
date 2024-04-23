import { KnDBTypes, KnDBUtils, KnDBConfig, KnPageOffset } from "will-sql";
import { KnDBField, KnSetting, KnPageSetting, KnModel } from "../models/AssureAlias";
import { Utilities } from "will-util";

export class KnSQLUtils {
    
    public static createQueryPaging(config: KnDBConfig, pageOffset: KnPageOffset) : string {
        let sql = "";
        if(KnDBUtils.isMYSQL(config) || KnDBUtils.isDB2(config)) {
            sql += " LIMIT "+pageOffset.offset+", "+pageOffset.rowsPerPage+" ";
        } else if(KnDBUtils.isMSSQL(config) || KnDBUtils.isORACLE(config)) {
			//caution: sqlserver need order by clause before offset & fetch otherwise error
            sql += " OFFSET "+pageOffset.offset+" ROWS ";
            sql += " FETCH NEXT "+pageOffset.rowsPerPage+" ROWS ONLY ";
        } else if(KnDBUtils.isINFORMIX(config)) {
            sql += " SKIP "+pageOffset.offset+" FIRST "+pageOffset.rowsPerPage+" ";
        } else if(KnDBUtils.isPOSTGRES(config)) {
            sql += " LIMIT "+pageOffset.rowsPerPage+" OFFSET "+pageOffset.offset+" "; 
        }
        return sql;
    }

    public static calculatePageOffset(pageOffset: KnPageOffset, totalRows?: number) : KnPageOffset {
        if(totalRows) pageOffset.totalRows = totalRows;
        let page = pageOffset.page;
        let chapter = pageOffset.rowsPerPage;
        let total = pageOffset.totalRows;
        let offset = 0;
        if(page>0) offset = (page-1)*chapter;
        let totalPages = 0;
        if(total > 0 && chapter > 0) {
            for(let i=0; i<total; i+=chapter) {
                totalPages++;
            }
            if(page > totalPages) {
                page = totalPages;
            }
        }
        pageOffset.offset = offset;
        pageOffset.page = page;
        pageOffset.totalPages = totalPages;
        return pageOffset;
    }
    
    public static getPageSetting(settings: KnSetting, params: any) : KnPageSetting {
        let result : KnPageSetting = { page: 1, rowsPerPage: settings.rowsPerPage, totalRows: 0, totalPages: 1, limit: 10, offset: 10 };
        if(params) {
            if(params.limit) {
                if(typeof(params.limit) === "string") {
                    result.limit = Number(params.limit);
                } else {
                    result.limit = params.limit;
                }    
            }
            if(params.page) {
                if(typeof(params.page) === "string") {
                    result.page = Number(params.page);
                } else {
                    result.page = params.page;
                }
            }
            if(params.offset) {
                if(typeof(params.offset) === "string") {
                    result.offset = Number(params.offset);
                } else {
                    result.offset = params.offset;
                }
            }
            if(params.rowsPerPage) {
                if(typeof(params.rowsPerPage) === "string") {
                    result.rowsPerPage = Number(params.rowsPerPage);
                } else {
                    result.rowsPerPage = params.rowsPerPage;
                }
            }
            if(params.orderBy) result.orderBy = params.orderBy;
            if(params.orderDir) result.orderDir = params.orderDir;
        }
        if(settings.maxRowsPerPage > 0 && result.rowsPerPage > settings.maxRowsPerPage) {
            result.rowsPerPage = settings.maxRowsPerPage;
        }
        if(settings.maxLimit > 0 && result.limit > settings.maxLimit) {
            result.limit = settings.maxLimit;
        }
        if(result.limit <= 0) result.limit = 10;
        if(result.page <= 0) result.page = 1;
        if(result.rowsPerPage <= 0) result.rowsPerPage = settings.rowsPerPage;
        return result;
    }

    public static getDBField(name: string, model: KnModel) : KnDBField | null {
        if(model && model.fields) {
            return model.fields[name];
        }
        return null;
    }

    public static parseParameterValue(name: string, value: any, model: KnModel) : any {
        let dbf = this.getDBField(name,model);
        if(dbf) {
            let dbt = KnDBUtils.parseDBTypes(dbf.type);
            if(dbt === KnDBTypes.INTEGER || dbt === KnDBTypes.BIGINT || dbt === KnDBTypes.DECIMAL) {
                if(Utilities.isString(value)) {
                    if(value.trim().length==0) {
                        return dbf.defaultValue?dbf.defaultValue:(dbf.nullable || dbf.nullable===undefined?null:"0");
                    } 
                    return value.replaceAll(",","");
                }
            } else if(dbt === KnDBTypes.DATE || dbt === KnDBTypes.TIME || dbt === KnDBTypes.DATETIME) {
                if(Utilities.isString(value)) {
                    if(value.trim().length==0) {
                        return dbf.defaultValue?dbf.defaultValue:(dbf.nullable || dbf.nullable===undefined?null:new Date());
                    }
                    if(dbt === KnDBTypes.DATE || dbt === KnDBTypes.DATETIME) { 
                        return Utilities.parseDate(value);
                    }
                }
            }
        }
        return value;
    }

}
