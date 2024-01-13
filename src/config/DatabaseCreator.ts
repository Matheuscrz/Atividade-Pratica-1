import { Pool, PoolConfig, QueryResult } from "pg";
import { config } from "dotenv";

config();

export class DatabaseCreator {
  private pool: Pool;

  constructor() {
    this.pool = this.createPool();
  }

  private createPool(): Pool {
    const poolConfig: PoolConfig = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: "postgres", // Conecta ao banco de dados principal
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || "5432", 10),
    };

    return new Pool(poolConfig);
  }

  async createDatabaseIfNotExists(): Promise<void> {
    try {
      // Verifica se o banco de dados existe
      const resultDatabase = await this.query(
        `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_DATABASE}';`
      );

      if (resultDatabase.rows.length === 0) {
        // Cria o banco de dados se não existir
        await this.query(`CREATE DATABASE ${process.env.DB_DATABASE};`);
      }
    } catch (error) {
      console.error(
        "Erro ao criar ou conectar-se ao banco de dados principal:",
        error
      );
      throw error;
    }
  }

  private async query(text: string, parameters?: any[]): Promise<QueryResult> {
    const client = await this.pool.connect();
    try {
      return await client.query(text, parameters);
    } finally {
      client.release();
    }
  }
}
