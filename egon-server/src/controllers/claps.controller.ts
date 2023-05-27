import { Request, Response } from "express";
import { connect } from "../database";

export async function getAllClaps(req: Request, res: Response): Promise<Response | void> {
    try {
        const connection = await connect();
        const claps = await connection.query('SELECT * FROM claps');
        return res.json(claps[0]);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllSentClaps (req: Request, res: Response): Promise<Response | void> {
    try {       
        const senderId = req.params.id;
        const connection = await connect();
        const claps = await connection.query(`SELECT * FROM claps WHERE FromUserId = ${senderId}`)
        return res.json(claps[0]);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllReceivedClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        const recipientId = req.params.id;
        const connection = await connect();
        const claps = await connection.query(`SELECT * FROM claps WHERE ToUserId = ${recipientId}`);
        return res.json(claps[0]);
    } catch(e) {
        console.log(e);
    }
}

export async function sendClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        const newClaps = req.body;
        const connection = await connect();
        await connection.query(`INSERT INTO claps (FromUserId, ToUserId, ClapCount, Message) VALUES ('${newClaps.sender}', '${newClaps.recipient}', '${newClaps.clapCount}', '${newClaps.message}')`);
        return res.json('Claps sent succesfully !');
    } catch (e) {
        console.log(e);
    }
}
