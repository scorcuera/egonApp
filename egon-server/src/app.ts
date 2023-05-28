import express, { Application } from "express";
import IndexRoutes from "./routes/index.routes";
import ClapRoutes from "./routes/claps.routes";
import { connection } from "./database";

export class App {
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
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use("/claps", ClapRoutes)
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