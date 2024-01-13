import { Server } from "./config/Server";

class App {
  private server: Server;

  constructor() {
    this.server = new Server();
  }

  start(): void {
    this.server.start();
  }
}
const app = new App();
app.start();
