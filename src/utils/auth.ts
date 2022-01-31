import * as jwt from "jsonwebtoken";

export const APP_SECRET = 'Y0u-$h411-nO+-Pa5s'

export interface AuthTokenPayload {
    userId: number,
};

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
    const token = authHeader.replace("Bearer ", '');
    if (!token) throw new Error("Where's your token dawg");
    return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
};


