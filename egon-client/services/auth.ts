import AuthUser from "../interfaces/user.interface";

const API_URL = "http://localhost:3000/auth/login";

const authService = {
    async loginUser(user: AuthUser) {
        const loggedInUser = await fetch(API_URL, {             
            method: 'POST', 
            body: JSON.stringify(user), 
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await loggedInUser.json();
        console.log(result);
        return loggedInUser;
    }
}

export default authService;