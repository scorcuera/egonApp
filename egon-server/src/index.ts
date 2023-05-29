import { ServerModel } from "./models/server.model";

function main() {
    const app = new ServerModel();
    app.listen();
}

main();