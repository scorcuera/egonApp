import { ReactNode, createContext, useEffect, useState } from "react";
import loginHandler from "../handlers/loginHandler";
import AuthUser from "../../interfaces/user.interface.ts";
import authService from "../services/auth.ts";

interface AuthContextProps {
    user: AuthUser | unknown;
    logInUser: (data: AuthUser) => void;
    logOutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: {},
    logInUser: () => {},
    logOutUser: () => {},
  });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState({});

    const checkUser = async () => {

        const storedToken = localStorage.getItem("authToken")

        if (storedToken) {
            const userData = await authService.checkUser(storedToken);
            console.log(userData);
            setUser(userData);
        }
    }

    const logInUser = async (data: AuthUser) => {
        const userData = await loginHandler(data);
        setUser(userData);
        return userData;
    }

    const logOutUser = () => {
        localStorage.removeItem("authToken");
        setUser({});
    }

    useEffect(() => {
        checkUser();
    }, [user])

    return (
        <AuthContext.Provider value={{ user, logInUser, logOutUser }}>
            {children}
        </ AuthContext.Provider>
    )
}
