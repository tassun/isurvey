export class AuthenError extends Error {
    public readonly code : number;
    public readonly errno : number | undefined;
    public readonly throwable : any;
    public readonly state : string | undefined;
    public readonly info?: any;
    constructor(message: string, code: number, errno?: number, throwable?: any, state?: string, info?: any) {
        super(message);
        this.code = code;
        this.errno = errno;
        this.throwable = throwable;
        this.state = state;
        this.info = info;
        Object.setPrototypeOf(this, AuthenError.prototype);
    }
}
