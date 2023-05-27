import express, { Application } from "express";

export class App {
    private app: Application;
    private port?: number | string;

    constructor(port?: number | string) {
        this.app = express();
        this.port = port;
    }

    settings() {
        this.app.set("port", this.port || process.env.PORT || 3000);
        this.app.use(express.json());
    }

    routes() {

    }

    listen() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server listening on port ${this.app.get("port")}`);
        })
    }
}