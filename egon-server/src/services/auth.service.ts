import { Auth } from "../interfaces/auth.interface";
import User from "../models/user.model";
import { generateToken, verifyToken } from "../utils/jwt.handler";
import { NewUser } from "../interfaces/user.interface";
import { encrypt, verify } from "../utils/password.handler";

type JwtPayload= {
    id: number;
    iat: number;
    exp: number;
}

async function registerNewUser(authUser: NewUser) {
    const isRegistered = await User.getUserByEmail(authUser.email);
    if (isRegistered) {
        return "This user already exists";
    }
    const passwordHash = await encrypt(authUser.password);
    await User.createUser({...authUser, password: passwordHash});
    return "New user registered succesfully !"
}

async function logInUser(user: Auth) {
    const userInfo = await User.getUserByEmail(user.email);

    if (!userInfo) {
        return "Not found user";
    }
    const passwordHash = userInfo.password;
    const isCorrectPassword = await verify(user.password, passwordHash);

    if (!isCorrectPassword) {
        return "Invalid Password";
    }

    const token = await generateToken(userInfo.id);
    const userEmail = userInfo.email;
    const userId = userInfo.id;

    const data = {
        token,
        userId,
        userEmail
    }

    return data;
}


async function checkUserFromJwt (jwt: string) {
    const jwtPayload = await verifyToken(jwt) as JwtPayload;
    if (!jwtPayload) {
        throw Error("Not valid JWT");
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

export { registerNewUser, logInUser, checkUserFromJwt };