import { KnRecordSet, KnSQLInterface } from 'will-sql';
import { KnContextInfo, KnDataTable, KnDataSet, KnModel, KnFieldSetting, KnFormatInfo, KnDataEntity } from '../models/AssureAlias';
import { BaseHandler } from './BaseHandler';
import { KnSQLUtils } from '../utils/KnSQLUtils';
import { KnUtility } from '../utils/KnUtility';

export class ProcessHandler extends BaseHandler {
    public model? : KnModel;

    public createDataTable(action?: string, datasets: KnDataSet = {}, entities: KnDataEntity | Array<any> = {}, renderer?: string) : KnDataTable {
        return {action: action?action:"", dataset: datasets, entity: entities, renderer: renderer};
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

    protected obtainParameters(knsql: KnSQLInterface, params?: any, model?: KnModel) {
        if(params) {
            for(let p in params) {
                let pv = this.parseParameterValue(p,params[p],model);
                knsql.set(p,pv);
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

    public async add(context: KnContextInfo) : Promise<KnDataTable> {
        return this.doAdd(context);
    }

    public async edit(context: KnContextInfo) : Promise<KnDataTable> {
        return this.doEdit(context);
    }

    public async insert(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.doInsert(context);
	}

    public async retrieve(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.doRetrieve(context);
    }

    public async update(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.doUpdate(context);
	}

    public async remove(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.doRemove(context);
	}

    public async list(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.doList(context);
	}

    public async export(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.doExport(context);
	}

    protected async doAdd(context: KnContextInfo) : Promise<KnDataTable> {
        return this.notImplementation();
    }

    protected async doEdit(context: KnContextInfo) : Promise<KnDataTable> {
        return this.notImplementation();
    }

    protected async doInsert(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.notImplementation();
    }

    protected async doRetrieve(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.notImplementation();
    }

    protected async doUpdate(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.notImplementation();
    }

    protected async doRemove(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.notImplementation();
    }

    protected async doList(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.notImplementation();
    }
    
    protected async doExport(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.notImplementation();
    }

}
