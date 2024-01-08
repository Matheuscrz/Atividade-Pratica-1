import { Pool, PoolConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();

class DB {
  private static instance: DB;
  private pool: Pool;

  private constructor() {
    const dbConfig: PoolConfig = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };

    this.pool = new Pool(dbConfig);
  }

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.pool.connect();
      console.log("Conectado ao banco de dados");
    } catch (error: any) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
    }
  }

  public async close(): Promise<void> {
    try {
      await this.pool.end();
      console.log("Conexão com o banco de dados fechada");
    } catch (error: any) {
      console.error(
        "Erro ao fechar a conexão com o banco de dados:",
        error.message
      );
    }
  }

  public query(text: string, values: any[] = []): Promise<any> {
    return this.pool.query(text, values);
  }
}

export default DB;
