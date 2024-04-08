import express, { Application } from "express";
import cors from 'cors';
import IndexRoutes from "../routes/index.routes";
import ClapRoutes from "../routes/claps.routes";
import AuthRoutes from "../routes/auth.routes";
import UserRoutes from "../routes/user.routes";


export class ServerModel {
    public app: Application;
    private port?: number | string;

    constructor (port?: number | string) {
        this.app = express();
        this.port = port;
        this.dbConnect();
        this.settings();
        this.routes();
    }

    settings() {
        this.app.set("port", this.port || process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(cors());      
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use("/claps", ClapRoutes);
        this.app.use("/auth", AuthRoutes);
        this.app.use("/users", UserRoutes)
    }

    listen() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server listening on port ${this.app.get("port")}`);
        })
    }
}