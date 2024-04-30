import { AuthUser } from "../interfaces/user.interface";
import authService from "../services/auth.service";

const loginHandler = async (authUser: AuthUser) => {
    const result = await authService.loginUser(authUser);
    if (result.data.token) {
        return result.data.token;
    }
    return undefined;
}

export default loginHandler;