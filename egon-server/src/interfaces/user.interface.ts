import { Auth } from "./auth.interface";

export interface User extends Auth {
    Username: string,
    UserRole: number,
    ClapsAvailable: number
}

export interface UserInfo {
    id: number, 
    name: string, 
    email: string,
    password: string,
    role_id: string, 
    claps_available: number,
    created_at: string,
}

export interface NewUser {
    name: string,
    email: string,
    password: string,
    role_id: number,
}

export interface UserInfoList {
    [index: number]: UserInfo
}
