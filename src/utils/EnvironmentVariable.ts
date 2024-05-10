import config from "will-util";
export const API_URL: string = config.env("API_URL","");
export const BASE_URL: string = config.env("BASE_URL","");
export const CDN_URL: string = config.env("CDN_URL",""); 
export const META_INFO: any = config.get("META_INFO") || {};
export const RELEASE_VERSION: string = config.env("RELEASE_VERSION","v1.0.0");
export const EXCEPT_LAUNCH_PATH: string = config.env("EXCEPT_LAUNCH_PATH","page_forgot");
export const DEFAULT_LANGUAGE: string = config.env("DEFAULT_LANGUAGE","TH");
export const VALID_ACCESSOR: boolean = config.env("VALID_ACCESSOR","true") === "true";
export const INLINE_BINDING: boolean = config.env("INLINE_BINDING") === "true";

export const HTTP_PORT: number = parseInt(config.env("HTTP_PORT","8080")) || 8080;
export const HTTPS_PORT: number = parseInt(config.env("HTTPS_PORT","8843")) || 8843;
export const SECRET_KEY: string = config.env("SECRET_KEY","ASSURE_OF_SECRET_KEY");
export const DB_SECTION: string = config.env("DB_SECTION","MYSQL");
export const APP_INSTANCES: string = config.env("APP_INSTANCES","CPU");
