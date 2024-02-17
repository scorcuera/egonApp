import { Request, Response } from "express";
import User from "../models/user.model";

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await User.getAllUsers();
        return res.json(users);
    } catch (e) {
        console.log(e);
    }
}
