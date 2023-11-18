import AuthUser from "../../interfaces/user.interface";
import authService from "../services/auth";

const loginHandler = async (authUser: AuthUser) => {
    const result = await authService.loginUser(authUser);
    if (result.token) {
        return result;
    }
    localStorage.setItem('authToken', result.token);
}

export default loginHandler;