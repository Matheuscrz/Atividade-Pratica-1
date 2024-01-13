import { Request, Response } from "express";
import Database from "../config/Database";
import { QueryResult } from "pg";

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { cpf, nome, data_nascimento } = req.body;

      // Utilize o método query para inserir o usuário
      const insertQuery = `
        INSERT INTO "usuario" (cpf, nome, data_nascimento) VALUES ($1, $2, $3) RETURNING *;
      `;

      const result: QueryResult = await Database.query(insertQuery, [
        cpf,
        nome,
        data_nascimento,
      ]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async getUserByCpf(req: Request, res: Response): Promise<void> {
    try {
      const cpf = req.params.cpf;

      // Utilize o método query para obter o usuário pelo CPF
      const selectQuery = `
        SELECT * FROM "usuario" WHERE cpf = $1;
      `;

      const result: QueryResult = await Database.query(selectQuery, [cpf]);

      if (result.rows.length === 0) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}
