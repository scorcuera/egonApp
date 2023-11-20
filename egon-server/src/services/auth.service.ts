import { Auth } from "../interfaces/auth.interface";
import { UserModel } from "../models/user.model";
import { generateToken, verifyToken } from "../utils/jwt.handler";
import { encrypt, verify } from "../utils/password.handler";

type JwtPayload= {
    id: number;
    iat: number;
    exp: number;
}

type NewUser = {
    Username: string,
    UserEmail: string,
    Password: string,
    UserRole: string,
    ClapsAvailable: number
}

async function registerNewUser(authUser: NewUser) {
    const isRegistered = await UserModel.findOne({
        where: {
            UserEmail: authUser.UserEmail
        }
    });
    if (isRegistered) {
        return "This user already exists";
    }
    const passwordHash = await encrypt(authUser.Password);
    await UserModel.create({ ...authUser, Password: passwordHash });
    return "New user registered succesfully !"
}

async function logInUser(user: Auth) {
    const isRegistered = await UserModel.findOne({
        where: {
            UserEmail: user.UserEmail
        }
    });
    if (!isRegistered) {
        return "Not found user";
    }
    const passwordHash = isRegistered.get('Password') as string;
    const isCorrectPassword = await verify(user.Password, passwordHash);


    if (!isCorrectPassword) {
        return "Invalid Password";
    }

    const token = await generateToken(isRegistered.get("UserId") as number);
    const userEmail = isRegistered.get("UserEmail");
    const userId = isRegistered.get("UserId");
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
    const loggedInUser = await UserModel.findOne({
        where: {
            UserID: payloadId
        }
    })
    const userId = loggedInUser?.get("UserId") as string;
    const userName = loggedInUser?.get("Username") as string;
    const userRole = loggedInUser?.get("UserRole") as string;
    const clapsAvailable = loggedInUser?.get("ClapsAvailable") as string;
    const userData = {userId, userName, userRole, clapsAvailable}
    
    return userData;
}

export { registerNewUser, logInUser, checkUserFromJwt };