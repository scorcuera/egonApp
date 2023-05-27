"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.settings();
        this.routes();
    }
    settings() {
        this.app.set("port", this.port || process.env.PORT || 3000);
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(index_routes_1.default);
    }
    listen() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server listening on port ${this.app.get("port")}`);
        });
    }
}
exports.App = App;
