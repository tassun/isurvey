export class VerifyError extends Error {
    public readonly code : number;
    public readonly errno : number | undefined;
    public readonly state: string | undefined;
    constructor(message: string, code: number, errno?: number, state?: string) {
        super(message);
        this.code = code;
        this.errno = errno;
        this.state = state;
        Object.setPrototypeOf(this, VerifyError.prototype);
    }
}
