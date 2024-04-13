import { AuthUser, RegisterUser } from "../interfaces/user.interface";

const authService = {
    async loginUser(user: AuthUser) {
        const loggedInUser = await fetch("http://localhost:3000/auth/login", {             
            method: 'POST', 
            body: JSON.stringify(user), 
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await loggedInUser.json();
        return result;
    },
    async registerUser(user: RegisterUser) {
        const registeredUser = await fetch("http://localhost:3000/auth/register", {
            method: 'POST',
            body: JSON.stringify({...user, role_id: parseInt(user.role_id)}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await registeredUser.json();
        return result;
    },
    async checkUser(token: string) {
        const response = await fetch ("http://localhost:3000/auth/checkUser",
        {
            headers: { Authorization: `Bearer: ${token}`}
        })
        const userData = await response.json();
        return userData;
    }
}

export default authService;