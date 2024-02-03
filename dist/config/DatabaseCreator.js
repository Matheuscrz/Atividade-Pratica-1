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
exports.DatabaseCreator = void 0;
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class DatabaseCreator {
    constructor() {
        this.pool = this.createPool();
    }
    createPool() {
        const poolConfig = {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: "postgres", // Conecta ao banco de dados principal
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || "5432", 10),
        };
        return new pg_1.Pool(poolConfig);
    }
    createDatabaseIfNotExists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica se o banco de dados existe
                const resultDatabase = yield this.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_DATABASE}';`);
                if (resultDatabase.rows.length === 0) {
                    // Cria o banco de dados se não existir
                    yield this.query(`CREATE DATABASE ${process.env.DB_DATABASE};`);
                }
            }
            catch (error) {
                console.error("Erro ao criar ou conectar-se ao banco de dados principal:", error);
                throw error;
            }
        });
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
}
exports.DatabaseCreator = DatabaseCreator;
