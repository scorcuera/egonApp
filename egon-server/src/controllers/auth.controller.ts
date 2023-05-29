import { Request, Response } from "express";
import { registerNewUser } from "../services/auth.service";

export async function registerUser (req: Request, res: Response): Promise<Response | void> {
    try {
        const newUser = req.body;
        const responseUser = await registerNewUser(newUser);
        return res.json(responseUser)
    } catch(e) {
        console.log(e)
    }

}