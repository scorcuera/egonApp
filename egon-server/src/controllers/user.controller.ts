import { Request, Response } from "express";
import prisma from "../connection/client";

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await prisma.users.findMany();
        return res.json(users);
    } catch (e) {
        console.log(e);
    }
}
