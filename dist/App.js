"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./config/Server");
class App {
    constructor() {
        this.server = new Server_1.Server();
    }
    start() {
        this.server.start();
    }
}
const app = new App();
app.start();
