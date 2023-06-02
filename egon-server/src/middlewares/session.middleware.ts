import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handler";

export function checkJWT(req: Request, res: Response , next: NextFunction) {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop() || "";
        const isOk = verifyToken(jwt);
        if (!isOk) {
            res.status(401);
            res.send("Not valid JWT");
        } else {
            console.log({ jwtByUser });
            next();
        }
        console.log({jwtByUser})
        return isOk;
    }catch (e) {
        res.status(400);
    }
}