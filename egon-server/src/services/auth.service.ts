import { Auth } from "../interfaces/auth.interface";
import { UserModel } from "../models/user.model";
import { generateToken } from "../utils/jwt.handler";
import { encrypt, verify } from "../utils/password.handler";

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
    const isCorrectPassword = verify(user.Password, passwordHash);

    if (!isCorrectPassword) {
        return "Invalid Password";
    }

    const token = await generateToken(isRegistered.get("UserId") as number);
    const data = {
        token,
        isRegistered
    }

    return data;
}

export { registerNewUser, logInUser };