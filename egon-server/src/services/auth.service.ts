import { UserModel } from "../models/user.model";

type NewUser = {
    Username: string,
    UserEmail: string,
    Password: number,
    UserRole: string,
    ClapsAvailable: number
}

const registerNewUser = async (authUser: NewUser) => {
    console.log(authUser);
    const isRegistered = await UserModel.findOne({
        where: {
            UserEmail: authUser.UserEmail
        }
    });
    if (!isRegistered) {
        await UserModel.create(authUser);
        return "New user registered succesfully !"
    }
    return "This user already exists";
}
// const logInUser = async () => {}

export { registerNewUser };