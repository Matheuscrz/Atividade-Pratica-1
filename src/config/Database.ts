import { Pool, PoolConfig, QueryResult } from "pg";
import { config } from "dotenv";
import { DatabaseCreator } from "./DatabaseCreator";

config();

class Database {
  private pool: Pool;
  private databaseCreator: DatabaseCreator;

  constructor() {
    this.databaseCreator = new DatabaseCreator();
    this.pool = this.createPool();
  }

  private createPool(): Pool {
    const poolConfig: PoolConfig = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || "5432", 10),
    };

    return new Pool(poolConfig);
  }

  async query(text: string, parameters?: any[]): Promise<QueryResult> {
    const client = await this.pool.connect();
    try {
      return await client.query(text, parameters);
    } finally {
      client.release();
    }
  }

  async closePool(): Promise<void> {
    await this.pool.end();
  }

  private async checkUserTable(): Promise<void> {
    try {
      // Verifica se a tabela de usuário existe
      const resultTable = await this.query(
        `SELECT 1 FROM information_schema.tables WHERE table_name = 'usuario';`
      );

      if (resultTable.rows.length === 0) {
        // Cria a tabela de usuário se não existir
        await this.query(`
          CREATE TABLE IF NOT EXISTS "usuario" (
            "id" SERIAL PRIMARY KEY,
            "cpf" VARCHAR(15) NOT NULL,
            "nome" VARCHAR(255) NOT NULL,
            "data_nascimento" DATE NOT NULL
          );
        `);
      }
    } catch (error) {
      console.error("Erro ao verificar ou criar tabela de usuários:", error);
      throw error;
    }
  }

  async initialize(): Promise<void> {
    await this.databaseCreator.createDatabaseIfNotExists();
    await this.checkUserTable(); // Verifica e cria a tabela de usuário se necessário
  }

  async connect(): Promise<void> {
    try {
      // Conecta brevemente para verificar a acessibilidade do banco de dados
      const client = await this.pool.connect();
      client.release();
    } catch (error) {
      console.error("Erro ao conectar-se ao banco de dados:", error);
      throw error;
    }
  }
}
const database = new Database();
export default database;
