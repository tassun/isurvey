import { KnSQLInterface, KnSQL } from 'will-sql';
import { KnContextInfo, KnDataTable, KnDataSet, KnModel, KnFieldSetting, KnFormatInfo, KnDataEntity } from '../models/AssureAlias';
import { BaseHandler } from './BaseHandler';
import { KnSQLUtils } from '../utils/KnSQLUtils';
import { KnUtility } from '../utils/KnUtility';

export class SystemHandler extends BaseHandler {
    public model? : KnModel;

    public createDataTable(action?: string, datasets: KnDataSet = {}, entities: KnDataEntity | Array<any> = {}, renderer?: string) : KnDataTable {
        return {action: action?action:"", dataset: datasets, entity: entities, renderer: renderer};
    }

    public emptyDataSet(fields?: KnFieldSetting) : KnDataSet {
        let result : KnDataSet = {};
        if(!fields) {
            fields = this.model?.fields;
        }
        if(fields) {
            for(let key in fields) {
                let dbf = fields[key];
                let selected = typeof dbf.selected === "undefined" || dbf.selected;
                if(selected) {
                    result[key] = "";
                }
            }
        }
        return result;
    }

    protected isInPageSetting(key: string, model: KnModel) : boolean {
        let result = false;
        if(model.disableFields) {
            result = model.disableFields.includes(key);
        }
        return result;
    }

    protected composeQueryInsert(context: any, model: KnModel, data?: any, assignParams: boolean = true) : KnSQLInterface {
        let params = data || context?.params;
        let cols = "";
        let vals = "";
        let found = false;
        let knsql = new KnSQL();
        //if defined fields then use it
        if(model.fields) {
            knsql.append("insert into ");
            knsql.append(model.name).append("(");
            for(let fname in model.fields) {
                if(!this.isInPageSetting(fname, model)) {
                    let dbf = model.fields[fname];
                    let fcalc = dbf.calculated !== undefined && dbf.calculated;
                    if(!fcalc) {
                        if(dbf.defaultValue !== undefined) knsql.set(fname,dbf.defaultValue,dbf.type);
                        if(dbf.created || (params && params.hasOwnProperty(fname))) {
                            if(found) {
                                cols += ",";
                                vals += ",";
                            }
                            cols += fname;
                            vals += "?"+fname;
                            found = true;
                        }
                    }                
                }
            }
            knsql.append(cols).append(") values(").append(vals).append(")");
        }
        if(assignParams) this.assignParameterValues(knsql, params, model);
        return knsql;
    }

    protected composeQueryUpdate(context: any, model: KnModel, data?: any, assignParams: boolean = true) : KnSQLInterface {
        let params = data || context?.params;
        let criteria = "";
        let found = false;
        let foundflag = false;
        let knsql = new KnSQL();
        if(model.fields) {
            knsql.append("update ");
            knsql.append(model.name).append(" set ");
            for(let fname in model.fields) {
                if(!this.isInPageSetting(fname, model)) {
                    let dbf = model.fields[fname];
                    let fcalc = dbf.calculated !== undefined && dbf.calculated;
                    let fkey = dbf.key !== undefined && dbf.key;
                    if(!fkey && (!fcalc || dbf.updated)) {
                        if(params && params[fname]) {
                            if(found || foundflag) {
                                knsql.append(", ");
                            }
                            knsql.append(fname).append(" = ?").append(fname);
                            if(dbf.defaultValue !== undefined) knsql.set(fname,dbf.defaultValue,dbf.type);
                            found = true;
                        } else {
                            if(dbf.updated) {
                                if(found || foundflag) {
                                    knsql.append(", ");
                                }
                                knsql.append(fname).append(" = ?").append(fname);
                                if(dbf.defaultValue !== undefined) knsql.set(fname,dbf.defaultValue,dbf.type);
                                foundflag = true;
                            }
                        }
                    }
                    if(fkey) {
                        if(criteria.length>0) criteria += " and ";
                        criteria += fname+" = ?"+fname;
                    } 
                }              
            }
            if(criteria.length>0) {
                knsql.append(" where ").append(criteria);
            }
        }
        if(assignParams) this.assignParameterValues(knsql, params, model);
        return knsql;
    }

    protected composeQueryDelete(context: any, model: KnModel, data?: any, assignParams: boolean = true) : KnSQLInterface {
        let params = data || context?.params;
        let found = false;
        let knsql = new KnSQL();
        if(model.fields) {
            knsql.append("delete from ");
            knsql.append(model.name);
            let filter = " where ";
            for(let fname in model.fields) {
                if(!this.isInPageSetting(fname, model)) {
                    let dbf = model.fields[fname];
                    let fkey = dbf.key !== undefined && dbf.key;
                    if(fkey) {
                        if(params && params[fname]) {
                            knsql.append(filter);
                            knsql.append(fname).append(" = ?").append(fname);
                            filter = " and ";
                            found = true;
                        }
                    } 
                }              
            }
        }
        if(assignParams) this.assignParameterValues(knsql, params, model, true);
        return knsql;
    }

    protected obtainParameterValues(context: KnContextInfo, model: KnModel) : KnDataSet {
        let result : KnDataSet = { };
        if(model.fields) {
            for(let key in model.fields) {
                result[key] = context.params[key];
            }
        }
        return result;
    }

    protected assignParameterValues(knsql: KnSQLInterface, params?: any, model?: KnModel, onlyKey: boolean = false) {
        if(params) {
            if(onlyKey && model && model.fields) {
                for(let fname in model.fields) {
                    let dbf = model.fields[fname];
                    let fkey = dbf.key !== undefined && dbf.key;
                    if(fkey) {
                        let pv = this.parseParameterValue(fname,params[fname],model);
                        knsql.set(fname,pv,dbf.type);                    
                    }
                }
            } else {
                let fields = model?.fields;
                for(let p in params) {
                    let dbf = fields?fields[p]:undefined;
                    let pv = this.parseParameterValue(p,params[p],model);
                    if(dbf) {
                        knsql.set(p,pv,dbf.type);
                    } else {
                        knsql.set(p,pv);
                    }
                }
            }
        }
    }

    protected parseParameterValue(name: string, value: any, model?: KnModel) : any {
        if(!model) model = this.model;
        if(!model) return value;
        return KnSQLUtils.parseParameterValue(name, value, model);
    }

    public transformData(rs: any, fields?: KnFieldSetting) : KnDataSet {
        if(!fields) {
            fields = this.model?.fields;
        }
        return KnUtility.transformData(rs, fields, this.formatData);
    }

    protected formatData(info: KnFormatInfo) : any {
        return KnUtility.formatData(info);
    }

}
