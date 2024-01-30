import { AuthUser } from "../interfaces/user.interface";
import authService from "../services/auth.service";

const loginHandler = async (authUser: AuthUser) => {
    const result = await authService.loginUser(authUser);
    if (result.token) {
        return result.token;
    }
    return undefined;
}

export default loginHandler;