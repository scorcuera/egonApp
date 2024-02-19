export interface AuthUser {
    "email": string,
    "password": string,
}

export interface User {
    id: number,
    name: string,
    role_id: string,
    claps_available: number,
}

export default User;