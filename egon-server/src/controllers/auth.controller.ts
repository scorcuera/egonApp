import { Request, Response } from "express";
import { registerNewUser, logInUser, checkUserFromJwt } from "../services/auth.service";

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

export async function checkUser (req: Request, res: Response) {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop() || "";
        const userData = await checkUserFromJwt(jwt);
        return res.json(userData);
    }catch (e) {
        console.log(e);
    }
}