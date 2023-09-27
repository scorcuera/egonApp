import express, { Application } from "express";
import cors from 'cors';
import IndexRoutes from "../routes/index.routes";
import ClapRoutes from "../routes/claps.routes";
import AuthRoutes from "../routes/auth.routes";
import { connection } from "../database/database";

export class ServerModel {
    private app: Application;
    private port?: number | string;

    constructor(port?: number | string) {
        this.app = express();
        this.port = port;
        this.settings();
        this.routes();
        this.dbConnect();
    }

    settings() {
        this.app.set("port", this.port || process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use("/claps", ClapRoutes)
        this.app.use("/auth", AuthRoutes);
    }

    listen() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server listening on port ${this.app.get("port")}`);
        })
    }

    async dbConnect() {
        await connection.authenticate();
        console.log('base de datos conectada !')
    }
}