import express from "express";
import DB from "../config/Database";

class UserController {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.post("/", this.addUser);
    this.router.get("/:cpf", this.getUserByCpf);
  }

  private async addUser(req: express.Request, res: express.Response) {
    try {
      const { cpf, nome, data_nascimento } = req.body;
      const db = DB.getInstance();

      const result = await db.query(
        "INSERT INTO usuarios (cpf, nome, data_nascimento) VALUES ($1, $2, $3) RETURNING *",
        [cpf, nome, data_nascimento]
      );

      res.json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  }

  private async getUserByCpf(req: express.Request, res: express.Response) {
    try {
      const { cpf } = req.params;
      const db = DB.getInstance();

      const result = await db.query("SELECT * FROM usuarios WHERE cpf = $1", [
        cpf,
      ]);

      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default UserController;
