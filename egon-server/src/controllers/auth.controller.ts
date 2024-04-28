import { Request, Response } from "express";
import {
  checkUserFromJwt,
} from "../services/auth.service";
import { NewUser } from "../interfaces/user.interface";
import { AuthUser } from "../interfaces/auth.interface";
import User from "../models/user.model";
import { encrypt, verify } from "../utils/password.handler";
import { generateToken } from "../utils/jwt.handler";

export async function registerUser(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const userDataFromClient = req.body as NewUser;
    const isRegistered = await User.getUserByEmail(userDataFromClient.email);
    if (isRegistered) {
      return res.status(409).json({ message: "User already exists" });
    }
    const passwordHash = await encrypt(userDataFromClient.password);
    await User.createUser({ ...userDataFromClient, password: passwordHash });
    return res.status(201).json({message: "New user registered successfully", data: userDataFromClient});
  } catch (e) {
    res.status(500).json({ message: "An error occurred while registering" });
  }
}

export async function logIn(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const userDataFromClient = req.body as AuthUser;
    const userInfo = await User.getUserByEmail(userDataFromClient.email);
    if (!userInfo) {
        return res.status(400).json({ message: "User does not exist" });
    }
    const encryptedPassword = userInfo?.password as string;
    const isPasswordValid = await verify(userDataFromClient.password, encryptedPassword);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const userId = userInfo?.id as number;
    const token = await generateToken(userId);
    const data = {
        token: token,
        user: {
            id: userInfo?.id,
            name: userInfo?.name,
            email: userInfo?.email,
            role_id: userInfo?.role_id
        }
    }

    res.status(200).json({ message: "User logged in", data: data});
  } catch (e) {
    res.status(500).json({ message: "An error occurred while logging in" });
  }
}

export async function checkUser(req: Request, res: Response) {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop() || "";
    const userData = await checkUserFromJwt(jwt);
    return res.json(userData);
  } catch (e) {
    console.log(e);
  }
}
