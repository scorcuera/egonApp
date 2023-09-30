import { Request, Response } from "express";
import { registerNewUser, logInUser } from "../services/auth.service";

export async function registerUser (req: Request, res: Response): Promise<Response | void> {
    try {
        const newUser = req.body;
        const responseUser = await registerNewUser(newUser);
        return res.json(responseUser)
    } catch(e) {
        console.log(e)
    }
}

export async function logIn (req: Request, res: Response): Promise<Response | void> {
    try {
        const newUser = req.body;
        const responseUser = await logInUser(newUser);
        return res.json(responseUser);
    } catch(e) {
        console.log(e)
    }
}