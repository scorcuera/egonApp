import User from "../models/user.model";
import { verifyToken } from "../utils/jwt.handler";

type JwtPayload= {
    id: number;
    iat: number;
    exp: number;
}

async function checkUserFromJwt (jwt: string) {
    const jwtPayload = await verifyToken(jwt) as JwtPayload;
    if (!jwtPayload) {
        throw Error("Not valid token");
    }
    const payloadId = jwtPayload.id;
    const userInfo = await User.getUserById(payloadId);

    const userData = {
        id: userInfo?.id,
        name: userInfo?.name,
        role_id: userInfo?.role_id,
        claps_available: userInfo?.claps_available
    }
    
    return userData;
}

export { checkUserFromJwt };