import Jwt from "jsonwebtoken";
import { SECRET_KEY, AUTH_TOKEN_EXPIRE_IN } from "../utils/EnvironmentVariable";

export interface UserTokenInfo {
    userid: string;
    username?: string;
    info?: string;
}

export class AuthenToken {
    public static createToken(userid: string | UserTokenInfo, expiredIn: string = AUTH_TOKEN_EXPIRE_IN) : string {
        if (typeof userid === "string") {
            return Jwt.sign({ userid }, SECRET_KEY, { expiresIn: expiredIn });
        }
	    return Jwt.sign({ ...userid }, SECRET_KEY, { expiresIn: expiredIn });
    }

    public static verifyToken(token: string, ignoreExpiration: boolean = false): UserTokenInfo {
        try {
            let data = Jwt.verify(token, SECRET_KEY, { ignoreExpiration });
            return data as UserTokenInfo;
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            } else {
                throw e;
            }
        }
    }
    
}
