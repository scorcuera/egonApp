import { Auth } from "./auth.interface";

export interface User extends Auth {
    Username: string,
    UserRole: number,
    ClapsAvailable: number
}