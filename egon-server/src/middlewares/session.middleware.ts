import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handler";

export function checkJWT(req: Request, res: Response) {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop() || "";
        const isOk = verifyToken(jwt);
        console.log({jwtByUser})
        return isOk;
    }catch (e) {
        res.status(400);
    }
}