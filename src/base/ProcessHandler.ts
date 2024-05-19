import { KnRecordSet } from 'will-sql';
import { KnContextInfo, KnDataTable, KnValidateInfo } from '../models/AssureAlias';
import { SystemHandler } from './SystemHandler';

export class ProcessHandler extends SystemHandler {

    protected async validateRequireFields(context: KnContextInfo, throwError: boolean = false, action?: string) : Promise<KnValidateInfo> {
        return Promise.resolve({valid: true});
    }

    protected async validateRequireFieldsInsert(context: KnContextInfo, throwError: boolean = false) : Promise<KnValidateInfo> {
        return Promise.resolve({valid: true});
    }

    public async add(context: KnContextInfo) : Promise<KnDataTable> {
        return this.doAdd(context);
    }

    public async entry(context: KnContextInfo) : Promise<KnDataTable> {
        return this.doEntry(context);
    }

    public async edit(context: KnContextInfo) : Promise<KnDataTable> {
        await this.validateRequireFields(context, true, "edit");
        return this.doEdit(context);
    }

    public async view(context: KnContextInfo) : Promise<KnDataTable> {
        await this.validateRequireFields(context, true, "view");
        return this.doView(context);
    }

    public async insert(context: KnContextInfo) : Promise<KnRecordSet> {
        await this.validateRequireFieldsInsert(context, true);
        return this.doInsert(context);
	}

    public async retrieve(context: KnContextInfo) : Promise<KnRecordSet> {
        await this.validateRequireFields(context, true, "retrieve");
        return this.doRetrieve(context);
    }

    public async update(context: KnContextInfo) : Promise<KnRecordSet> {
        await this.validateRequireFields(context, true, "update");
        return this.doUpdate(context);
	}

    public async remove(context: KnContextInfo) : Promise<KnRecordSet> {
        await this.validateRequireFields(context, true, "remove");
        return this.doRemove(context);
	}

    public async list(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.doList(context);
	}

    public async listing(context: KnContextInfo) : Promise<KnDataTable> {
        return this.doListing(context);
	}

    public async export(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.doExport(context);
	}

    protected async doAdd(context: KnContextInfo) : Promise<KnDataTable> {
        return this.notImplementation();
    }

    protected async doEntry(context: KnContextInfo) : Promise<KnDataTable> {
        return this.notImplementation();
    }

    protected async doEdit(context: KnContextInfo) : Promise<KnDataTable> {
        return this.notImplementation();
    }

    protected async doView(context: KnContextInfo) : Promise<KnDataTable> {
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

    protected async doListing(context: KnContextInfo) : Promise<KnDataTable> {
        return this.notImplementation();
    }
    
    protected async doExport(context: KnContextInfo) : Promise<KnRecordSet> {
        return this.notImplementation();
    }

}
