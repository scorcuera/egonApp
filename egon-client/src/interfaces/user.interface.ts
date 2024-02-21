export interface AuthUser {
    email: string,
    password: string,
}

export interface RegisterUser {
    name: string,
    email: string,
    password: string,
    role_id: string,
}

export interface User {
    id: number,
    name: string,
    role_id: string,
    claps_available: number,
}
