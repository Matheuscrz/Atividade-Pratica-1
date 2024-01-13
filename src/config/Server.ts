import express, { Application } from "express";
import Database from "./Database";
import { Routes } from "../routes/Routes";
import { ErrorHandlerMiddleware } from "../middlewares/ErroMiddleware";

export class Server {
  private app: Application = express();
  private port: number = parseInt(process.env.PORT || "3000", 10);
  private routes: Routes = new Routes();

  constructor() {
    this.setup();
  }

  private async setup(): Promise<void> {
    try {
      await Database.initialize();
      await Database.connect();
    } catch (error) {
      console.error("Falha ao conectar-se ao banco de dados:", error);
      process.exit(1); // Se não conseguir conectar, encerra o aplicativo
    }

    this.app.use(express.json());
    this.app.use(ErrorHandlerMiddleware.handle);
    this.app.use(this.routes.getRouter());
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando na porta: ${this.port}`);
    });
  }
}
