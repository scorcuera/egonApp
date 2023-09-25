import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handler";
import { UserModel } from "../models/user.model";

type JwtPayload= {
    id: number;
    iat: number;
    exp: number;
}

export async function checkJWT(req: Request, res: Response , next: NextFunction) {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop() || "";
        const jwtPayload = await verifyToken(jwt) as JwtPayload;
        if (!jwtPayload) {
            res.status(401);
            res.send("Not valid JWT");
        }
        const payloadId = jwtPayload.id;
        const loggedInUser = await UserModel.findOne({
            where: {
                UserID: payloadId
            }
        })
        const loggedInUserRole = loggedInUser?.get('UserRole');
        
        if (loggedInUserRole !== "manager") {
            res.status(401);
            res.send("Not valid permissions");
        }
        next()
        return jwtPayload;
    }catch (e) {
        res.status(400);
    }
}