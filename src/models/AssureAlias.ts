import { KnDBConfig, KnDBTypes, KnResultSet, KnPageOffset } from "will-sql";

export const RESERVED_PARAMETERS: string[] = ["program", "subprog", "language", "authtoken", "action", "caption", "ciphertext"];

export type KnGenericObject = { [name: string]: any };

export type KnEnumFieldTypes = keyof typeof KnDBTypes;

export type KnAlias = {
    [key : string]: string | KnDBConfig;
}

export interface KnDBField {
    type: KnDBTypes | KnEnumFieldTypes;
    size?: number;
    precision?: number,
    key? : boolean;
    calculated?: boolean;
    selected? : boolean;
    nullable? : boolean;
    created? : boolean;
    updated? : boolean
    defaultValue?: any;
    options?: KnGenericObject;
}

export interface KnFieldSetting {
    [name: string]: KnDBField;
}

export interface KnLoggerInterface {
    fatal(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    trace(...args: any[]): void;
}

export interface KnModel {
    /**
     * table or schema name
     */
    name: string;
    /**
     * white list of fields setting
     */
    fields?: KnFieldSetting;
}

export interface KnPageSetting extends KnPageOffset {
    /**
     * order by field/column name
     */
    orderBy?: string;
    /**
     * order direction ascending or descending
     */
    orderDir?: string | "ASC" | "DESC";
}

export interface KnSetting {
    rowsPerPage: number;
    maxRowsPerPage: number;
    maxLimit: number;
    /**
     * disable response columns attribute
     */
    disableColumnSchema?: boolean;
    /**
     * disable response offsets attribute
     */
    disablePageOffset?: boolean;
    /**
     * disable compose query paging
     */
    disableQueryPaging?: boolean;
}

export interface KnDataSet {
    [name: string]: any;
}

export interface KnDataEntity {
    [name: string]: KnDataSet;
}

export interface KnDataTable {
    action: string;
    dataset: KnDataSet;    
    entity: KnDataEntity | Array<any>;
    meta?: KnDataSet;
    renderer?: string;
    error?: any;
}

export interface KnFormatInfo {
    name?: string;
    value: any;
    rs?: any;
    field?: KnDBField;
}

export interface KnDataMapSetting {
    keyName: string;
    valueNames: string[];
    groupId?: string;
    groupNames?: string[];
    categoryName?: string;
    options?: any;
}

export interface KnDataMapEntitySetting extends KnDataTableSetting {
    setting?: KnDataMapSetting;
}

export interface KnDataMapRecordSetting extends KnDataTableResultSet {
    setting: KnDataMapSetting;
}

export interface KnDataTableSetting {
    tableName: string;
    keyField: string;
    addonFields?: string;
    orderFields?: string;
    checkActive?: boolean;
    checkSite?: boolean;
    siteOnly?: boolean;
    addonFilters?: string;
    captionFields?: string;
    nameen?: string;
    nameth?: string;
    options?: any;
}

export interface KnDataTableResultSet {
    tablename: string;
    resultset: KnResultSet;
    options?: any;
}

export interface KnValidateInfo {
    valid: boolean;
    info?: string;
    options?: any;
}

export interface KnMetaInfo {
    api_url: string;
    base_url: string; 
    cdn_url: string; 
    language: string;
    version: string;
    storage?: string;
    info?: any;
    user?: KnUserInfo;
}

export interface KnContextInfo {
    params: any;
    meta: any;
    options?: any;
}

export interface KnSigninInfo {
    username: string;
    password: string;
    site?: string;
}

export interface KnUserInfo {
    userid: string;
    username: string;
    password: string;
    level: string;
    name: string;
    surname: string;
    email?: string;
    mobile?: string;
    info?: any;
}

export interface KnExportInfo {
    table: string;
    file: string;
}
