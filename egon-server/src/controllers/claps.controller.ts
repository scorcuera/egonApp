import { Request, Response } from "express";
import prisma from "../connection/client";

export async function getAllClaps(req: Request, res: Response): Promise<Response | void> {
    try {
        const claps = await prisma.claps.findMany();
        return res.json(claps);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllSentClaps (req: Request, res: Response): Promise<Response | void> {
    try {       
        const senderId = Number(req.params.id);
        const claps = await prisma.claps.findMany({
            where: {
                from_user_id: senderId
            }
        });
        return res.json(claps);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllReceivedClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        const recipientId = Number(req.params.id);
        const claps = await prisma.claps.findMany({
            where: {
                to_user_id: recipientId
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
        await prisma.claps.create({
            data: newClaps
        })
        return res.json('Claps sent succesfully !');
    } catch (e) {
        console.log(e);
    }
}
