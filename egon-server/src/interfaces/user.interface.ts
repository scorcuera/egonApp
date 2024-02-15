import { Auth } from "./auth.interface";

export interface User extends Auth {
    Username: string,
    UserRole: number,
    ClapsAvailable: number
}

interface UserInfo {
    UserId: number, 
    Username: string, 
    UserRole: string, 
    UserEmail: string
}

export interface UserInfoList {
    [index: number]: UserInfo
}
