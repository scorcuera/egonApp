import { App } from "./app";
import * as dotenv from "dotenv";
dotenv.config();

function main() {
    const app = new App();
    app.listen();
}

main();