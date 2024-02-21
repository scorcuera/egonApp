import { User } from "../interfaces/user.interface";

const userService = {
    async getAllUsers() {
        try {
            const result = await fetch('http://localhost:3000/users');
            const users : User[] = await result.json();
            return users;
        } catch (e) {
            console.log(e);
        }
    }
};

export default userService;
