import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UserModel.findAll({attributes: ['UserId', 'Username', 'UserRole', 'UserEmail']});
        return res.json(users);
    } catch (e) {
        console.log(e);
    }
}
