import express from "express";
import bodyParser from "body-parser";
import Routes from "../routes/Routes";

class Server {
  private app: express.Application;
  private PORT: number;
  private serverInstance: any;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    this.app.use(bodyParser.json());
    this.app.use(new Routes().getRouter());
  }

  public start(): void {
    this.serverInstance = this.app.listen(process.env.PORT || 3000, () => {
      console.log(
        `O servidor está rodando na porta ${this.serverInstance.address().port}`
      );
    });
  }

  public close(): void {
    this.serverInstance.close();
  }

  public getApp(): express.Application {
    return this.app;
  }
}

export default Server;
