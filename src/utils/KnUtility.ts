import { KnResultSet } from 'will-sql';
import { Utilities } from "will-util";
import { KnFieldSetting, KnFormatInfo, KnDataSet, KnDataEntity, KnDataMapSetting, KnDataMapRecordSetting, RESERVED_PARAMETERS } from "../models/AssureAlias";
import { DEFAULT_LANGUAGE } from "./EnvironmentVariable";

export class KnUtility {
    
    public static createMapEntities(rs: KnResultSet, setting: KnDataMapSetting) : Map<string,string> {
        let map = new Map<string,string>();
        for(let row of rs.rows) {
            let valid = true;
            let type = "";
            if(setting.groupNames) {
                for(let g of setting.groupNames) {
                    type += String(row[g]);
                }
            }
            if(setting.groupId) {
                valid = setting.groupId == type;
            }
            if(valid) {
                let key = row[setting.keyName];
                let values = "";
                for(let v of setting.valueNames) {
                    values += String(row[v]);
                }
                map.set(key,values);
            }
        }
        return map;
    }

    public static createDataEntity(records: KnDataMapRecordSetting[]) : KnDataEntity {
        let result : KnDataEntity = { };
        for(let r of records) {
            let map = this.createMapEntities(r.resultset, r.setting);
            result[r.setting.categoryName || r.tablename] = Object.fromEntries(map);
        }
        return result;
    }

    public static getDefaultLanguage(context?: any) : string {
        return context?.params?.language || context?.meta?.headers?.language || DEFAULT_LANGUAGE;    
    }

    public static isEnglish(context: any) : boolean {
        return this.isLanguage(context,"EN");
    }

    public static isThai(context: any) : boolean {
        return this.isLanguage(context,"TH");
    }

    public static isLanguage(context: any, language: string) : boolean {
        return language==this.getDefaultLanguage(context);
    }

    public static isReservedParameter(parameter: string) : boolean {
        return RESERVED_PARAMETERS.includes(parameter);
    }
    
    public static transformData(rs: any, fields?: KnFieldSetting, formatter?: Function) : KnDataSet {
        let result : KnDataSet = {};
        let found = false;
        if(fields) {
            for(let key in fields) {
                let dbf = fields[key];
                let selected = typeof dbf.selected === "undefined" || dbf.selected;
                if(selected) {
                    let value = null;
                    if(rs.hasOwnProperty(key)) {
                        value = rs[key];
                    }
                    found = true;
                    let info = {name: key, value: value, rs: rs, field: fields[key]};
                    result[key] = formatter?formatter.call(this,info):this.formatData(info);
                }
            }
        }
        if(!found) {
            for(let key in rs) {
                let info = {name: key, value: rs[key], rs: rs};
                result[key] = formatter?formatter.call(this,info):this.formatData(info);
            }
        }
        return result;
    }

    public static formatData(info: KnFormatInfo) : any {
        if(info.value instanceof Date) {
            if(info.field?.type == "DATE") {
                info.value = Utilities.formatDate(info.value as Date);
            } else if(info.field?.type == "TIME") {
                info.value = Utilities.formatTime(info.value as Date);
            } else if(info.field?.type == "DATETIME") {
                info.value = Utilities.formatDateTime(info.value as Date);
            } else {
                info.value = Utilities.formatDate(info.value as Date);
            }
        } else if(typeof info.value === "number") {
            if(info.field?.type == "INTEGER" || info.field?.type == "BIGINT") {
                let maxdigit = info.field?.options?.maxdigit || 0;
                let mindigit = info.field?.options?.mindigit || 0;
                info.value = (info.value as number).toLocaleString("en-US", { maximumFractionDigits: maxdigit, minimumFractionDigits: mindigit });
            } else {
                let maxdigit = info.field?.options?.maxdigit || 2;
                let mindigit = info.field?.options?.mindigit || 2;
                info.value = (info.value as number).toLocaleString("en-US", { maximumFractionDigits: maxdigit, minimumFractionDigits: mindigit });
            }
        }
        return info.value;
    }
    
    public static serializeTimestamp(now: Date, delimiter?: string, includeMillis: boolean = true) : string {
		let dd = now.getDate(); 
		let mo = now.getMonth()+1; 
		let year = now.getFullYear(); 
		let month = ((mo < 10) ? "0" : "") + mo; 
		let day = ((dd < 10) ? "0" : "") + dd; 
		let hh = now.getHours(); 
		let mm = now.getMinutes(); 
		let ss = now.getSeconds(); 
		let hour = ((hh < 10) ? "0":"") + hh; 
		let minute = ((mm < 10) ? "0" : "") + mm; 
		let second = ((ss < 10) ? "0" : "") + ss; 
        let ml = now.getMilliseconds();
        let millis = ((ml < 100) ? "0" : "") + ml;
		if(includeMillis) {
			return [year, month, day, hour, minute, second, millis].join(delimiter?delimiter:'');
		}
		return [year, month, day, hour, minute, second].join(delimiter?delimiter:'');
    }

}
