import { ReactNode, createContext, useState } from "react";
import loginHandler from "../handlers/loginHandler";
import AuthUser from "../../interfaces/user.interface.ts";

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

    const logInUser = async (data: AuthUser) => {
        const userData = await loginHandler(data);
        setUser(userData);
    }

    const logOutUser = () => {
        localStorage.removeItem("authToken");
        setUser({});
    }

    return (
        <AuthContext.Provider value={{ user, logInUser, logOutUser }}>
            {children}
        </ AuthContext.Provider>
    )
}
