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
    },
    async checkUser(token: string) {
        console.log(token);
        const response = await fetch ("http://localhost:3000/auth/checkUser",
        {
            headers: { Authorization: `Bearer: ${token}`}
        })
        const userData = response.json();
        return userData;
    }
}

export default authService;