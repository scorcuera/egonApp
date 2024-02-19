import { ReactNode, createContext, useEffect, useState } from "react";
import loginHandler from "../handlers/loginHandler";
import { User, AuthUser } from "../interfaces/user.interface.ts";
import authService from "../services/auth.service.ts";

interface AuthContextProps {
    user: User | null;
    logInUser: (data: AuthUser) => Promise<User|undefined>;
    logOutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: {} as User,
    logInUser: async () => undefined,
    logOutUser: () => {}
  });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const checkUser = async () => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken == undefined) {
            setUser(null);
            return;   
        }
        const userData = await authService.checkUser(storedToken);
        setUser(userData);
        return userData;
    }

    const logInUser = async (data: AuthUser) => {
        const token = await loginHandler(data);
        localStorage.setItem('authToken', token);
        const userData = await checkUser();
        return userData;
    }

    const logOutUser = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    }

    useEffect(() => {
        checkUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, logInUser, logOutUser }}>
            {children}
        </ AuthContext.Provider>
    )
}
