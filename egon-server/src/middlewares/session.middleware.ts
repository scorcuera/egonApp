import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handler";
import User from "../models/user.model";

type JwtPayload= {
    id: number;
    iat: number;
    exp: number;
}

export async function isAdmin(req: Request, res: Response , next: NextFunction) {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop() || "";
        const jwtPayload = await verifyToken(jwt) as JwtPayload;
        if (!jwtPayload) {
            return res.status(401).json({message: "Not valid token"});
        }
        const payloadId = jwtPayload.id;
        const loggedInUser = await User.getUserById(payloadId)
        const loggedInUserRole = loggedInUser?.role_id;
        
        if (loggedInUserRole !== 2) {
            return res.status(401).json({message: "Not valid permissions"});
        }
        next()
        return jwtPayload;
    }catch (e) {
        res.status(500).json({message: "An error occurred in the server"});
    }
}

export async function isUser(req: Request, res: Response , next: NextFunction) {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop() || "";
        const jwtPayload = await verifyToken(jwt) as JwtPayload;
        if (!jwtPayload) {
            return res.status(401).json({message: "Not valid token"});
        }
        next()
        return jwtPayload;
    }catch (e) {
        res.status(500).json({message: "An error occurred in the server"});
    }
}