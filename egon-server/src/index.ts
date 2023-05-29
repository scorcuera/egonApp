import { Server } from "./models/server.model";

function main() {
    const app = new Server();
    app.listen();
}

main();