import AuthUser from "../../interfaces/user.interface";


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
    }
}

export default authService;