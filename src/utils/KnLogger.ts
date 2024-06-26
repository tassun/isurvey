import { KnLoggerInterface } from "../models/AssureAlias";

export class KnLogger implements KnLoggerInterface {
    public fatal(...args: any[]): void {
        console.error(...args);
    }
    public error(...args: any[]): void {
        console.error(...args);
    }
    public warn(...args: any[]): void {
        console.warn(...args);
    }
    public info(...args: any[]): void {
        console.info(...args);
    }
    public debug(...args: any[]): void {
        console.debug(...args);
    }
    public trace(...args: any[]): void {
        console.trace(...args);
    }
}
