import { Request, Response } from "express";
import Clap from "../models/clap.model";

export async function getAllClaps(req: Request, res: Response): Promise<Response | void> {
    try {
        const claps = await Clap.getAllClaps();
        return res.status(200).json(claps);
    } catch (e) {
        res.status(500).json({message: "An error occurred while fetching claps"});
    }
}

export async function getAllSentClaps (req: Request, res: Response): Promise<Response | void> {
    try {       
        const senderId = Number(req.params.id);
        const claps = await Clap.getAllSentClaps(senderId);
        return res.status(200).json(claps);
    } catch (e) {
        res.status(500).json({message: "An error occurred while fetching claps"});
    }
}

export async function getAllReceivedClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        const recipientId = Number(req.params.id);
        const claps = await Clap.getAllReceivedClaps(recipientId);
        if (Array.isArray(claps) && claps.length === 0) {
            return res.status(200).json({message: "You don't have any received claps yet"});
        }
        return res.status(200).json(claps);
    } catch(e) {
        res.status(500).json({message: "An error occurred while fetching claps"});
    }
}

export async function sendClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        const newClaps = req.body;
        await Clap.sendClaps(newClaps);
        return res.status(201).json({message: "Claps sent succesfully!"});
    } catch (e) {
        res.status(500).json({message: "An error occurred while sending claps"});
    }
}
