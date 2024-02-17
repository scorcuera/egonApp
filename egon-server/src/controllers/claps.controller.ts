import { Request, Response } from "express";
import Clap from "../models/clap.model";

export async function getAllClaps(req: Request, res: Response): Promise<Response | void> {
    try {
        const claps = await Clap.getAllClaps();
        return res.json(claps);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllSentClaps (req: Request, res: Response): Promise<Response | void> {
    try {       
        const senderId = Number(req.params.id);
        const claps = await Clap.getAllSentClaps(senderId);
        return res.json(claps);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllReceivedClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        const recipientId = Number(req.params.id);
        const claps = await Clap.getAllReceivedClaps(recipientId);
        return res.json(claps);
    } catch(e) {
        console.log(e);
    }
}

export async function sendClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        const newClaps = req.body;
        await Clap.sendClaps(newClaps);
        return res.json('Claps sent succesfully !');
    } catch (e) {
        console.log(e);
    }
}
