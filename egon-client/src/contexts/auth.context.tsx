import { ReactNode, createContext, useEffect, useState } from "react";
import loginHandler from "../handlers/loginHandler";
import { User, AuthUser } from "../interfaces/user.interface.ts";
import authService from "../services/auth.service.ts";

interface AuthContextProps {
    user: User | null;
    logInUser: (data: AuthUser) => void;
    logOutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: {} as User,
    logInUser: () => {},
    logOutUser: () => {},
  });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const checkUser = async () => {

        const storedToken = localStorage.getItem("authToken")

        if (storedToken) {
            const userData : User = await authService.checkUser(storedToken);
            setUser(userData);
        }
    }

    const logInUser = async (data: AuthUser) => {
        await loginHandler(data);
        await checkUser();
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
