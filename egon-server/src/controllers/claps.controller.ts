import { Request, Response } from "express";
import { Clap } from "../models/clap.model";

export async function getAllClaps(req: Request, res: Response): Promise<Response | void> {
    try {
        const claps = await Clap.findAll();
        return res.json(claps);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllSentClaps (req: Request, res: Response): Promise<Response | void> {
    try {       
        const senderId = req.params.id;
        const claps = await Clap.findOne({
            where: {
                FromUserId: senderId
            }
        });
        return res.json(claps);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllReceivedClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        const recipientId = req.params.id;
        const claps = await Clap.findOne({
            where: {
                ToUserId: recipientId
            }
        });
        return res.json(claps);
    } catch(e) {
        console.log(e);
    }
}

export async function sendClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        const newClaps = req.body;
        await Clap.create(newClaps);
        return res.json('Claps sent succesfully !');
    } catch (e) {
        console.log(e);
    }
}
