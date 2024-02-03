"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
const DatabaseCreator_1 = require("./DatabaseCreator");
(0, dotenv_1.config)();
class Database {
    constructor() {
        this.databaseCreator = new DatabaseCreator_1.DatabaseCreator();
        this.pool = this.createPool();
    }
    createPool() {
        const poolConfig = {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || "5432", 10),
        };
        return new pg_1.Pool(poolConfig);
    }
    query(text, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                return yield client.query(text, parameters);
            }
            finally {
                client.release();
            }
        });
    }
    closePool() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.end();
        });
    }
    checkUserTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica se a tabela de usuário existe
                const resultTable = yield this.query(`SELECT 1 FROM information_schema.tables WHERE table_name = 'usuario';`);
                if (resultTable.rows.length === 0) {
                    // Cria a tabela de usuário se não existir
                    yield this.query(`
          CREATE SCHEMA IF NOT EXISTS "sistema";
          CREATE TABLE IF NOT EXISTS "sistema.usuario" (
            "id" SERIAL PRIMARY KEY,
            "cpf" VARCHAR(15) NOT NULL,
            "nome" VARCHAR(255) NOT NULL,
            "data_nascimento" DATE NOT NULL
          );
        `);
                }
            }
            catch (error) {
                console.error("Erro ao verificar ou criar tabela de usuários:", error);
                throw error;
            }
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.databaseCreator.createDatabaseIfNotExists();
            yield this.checkUserTable(); // Verifica e cria a tabela de usuário se necessário
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Conecta brevemente para verificar a acessibilidade do banco de dados
                const client = yield this.pool.connect();
                client.release();
            }
            catch (error) {
                console.error("Erro ao conectar-se ao banco de dados:", error);
                throw error;
            }
        });
    }
}
const database = new Database();
exports.default = database;
