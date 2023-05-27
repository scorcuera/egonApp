import { Request, Response } from "express";
import { connect } from "../database";

export async function getAllClaps(req: Request, res: Response): Promise<Response | void> {
    try {
        let connection = await connect();
        let claps = await connection.query('SELECT * FROM claps');
        return res.json(claps[0]);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllSentClaps (req: Request, res: Response): Promise<Response | void> {
    try {       
        let senderId = req.params.id;
        let connection = await connect();
        let claps = await connection.query(`SELECT * FROM claps WHERE FromUserId = ${senderId}`)
        return res.json(claps[0]);
    } catch (e) {
        console.log(e);
    }
}

export async function getAllReceivedClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        let recipientId = req.params.id;
        let connection = await connect();
        let claps = await connection.query(`SELECT * FROM claps WHERE ToUserId = ${recipientId}`);
        return res.json(claps[0]);
    } catch(e) {
        console.log(e);
    }
}

export async function sendClaps (req: Request, res: Response): Promise<Response | void> {
    try {
        let newClaps = req.body;
        let connection = await connect();
        await connection.query(`INSERT INTO claps (FromUserId, ToUserId, ClapCount, Message) VALUES ('${newClaps.sender}', '${newClaps.recipient}', '${newClaps.clapCount}', '${newClaps.message}')`);
        return res.json('Claps sent succesfully !');
    } catch (e) {
        console.log(e);
    }
}
