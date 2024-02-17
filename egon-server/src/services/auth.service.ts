import { Auth } from "../interfaces/auth.interface";
import prisma from "../connection/client";
import { generateToken, verifyToken } from "../utils/jwt.handler";
import { encrypt, verify } from "../utils/password.handler";

type JwtPayload= {
    id: number;
    iat: number;
    exp: number;
}

type NewUser = {
    name: string,
    email: string,
    password: string,
    role_id: number,
    claps_available: number
}

async function registerNewUser(authUser: NewUser) {
    console.log(authUser);
    const isRegistered = await prisma.users.findUnique({
        where: {
            email: authUser.email
        }
    });
    if (isRegistered) {
        return "This user already exists";
    }
    const passwordHash = await encrypt(authUser.password);
    await prisma.users.create({
        data: {
            name: authUser.name,
            email: authUser.email,
            password: passwordHash,
            role_id: authUser.role_id,
        }
    })
    return "New user registered succesfully !"
}

async function logInUser(user: Auth) {
    const isRegistered = await prisma.users.findUnique({
        where: {
            email: user.email
        }
    });

    if (!isRegistered) {
        return "Not found user";
    }
    const passwordHash = isRegistered.password;
    const isCorrectPassword = await verify(user.password, passwordHash);

    if (!isCorrectPassword) {
        return "Invalid Password";
    }

    const token = await generateToken(isRegistered.id);
    const userEmail = isRegistered.email;
    const userId = isRegistered.id;

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
    const loggedInUser = await prisma.users.findUnique({
        where: {
            id: payloadId
        }
    });

    const userId = loggedInUser?.id;
    const userName = loggedInUser?.name;
    const userRole = loggedInUser?.role_id;
    const clapsAvailable = loggedInUser?.claps_available;
    const userData = {userId, userName, userRole, clapsAvailable}
    
    return userData;
}

export { registerNewUser, logInUser, checkUserFromJwt };