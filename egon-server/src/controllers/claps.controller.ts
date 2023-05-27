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
