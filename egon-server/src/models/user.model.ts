import { prisma } from "../connection/prismaClient";
import { NewUser } from "../interfaces/user.interface";

const User = {
    getAllUsers: async () => {
        try {
            const users = await prisma.users.findMany();
            return users;
        } catch (e) {
            console.log(e);
        }
    },
    getUserByEmail: async (email: string) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email: email
                }
            });
            return user;
        } catch (e) {
            console.log(e);
        }
    },
    getUserById: async (userId: number) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: userId
                }
            });
            return user;
        } catch (e) {
            console.log(e);
        }
    },
    createUser: async (newUser: NewUser) => {
        try {
            await prisma.users.create({
                data: {
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password,
                    role_id: newUser.role_id ?? 1
                }
            });
            return "User created succesfully !";
        } catch (e) {
            console.log(e);
        }
    },
    updateUser: async (userId: number, updatedUser: any) => {
        try {
            await prisma.users.update({
                where: {
                    id: userId
                },
                data: updatedUser
            });
            return "User updated succesfully !";
        } catch (e) {
            console.log(e);
        }
    },
    deleteUser: async (userId: number) => {
        try {
            await prisma.users.delete({
                where: {
                    id: userId
                }
            });
            return "User deleted succesfully !";
        } catch (e) {
            console.log(e);
        }
    }
}

export default User;