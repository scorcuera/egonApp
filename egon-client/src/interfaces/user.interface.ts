export interface AuthUser {
    "Username": string,
    "UserEmail": string,
    "Password": string,
    "UserRole": string,
}

export interface User {
    clapsAvailable: string,
    userId: string,
    userName: string,
    userRole: string
}

export default User;