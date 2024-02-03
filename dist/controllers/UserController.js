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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const Database_1 = __importDefault(require("../config/Database"));
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cpf, nome, data_nascimento } = req.body;
                // Utilize o método query para inserir o usuário
                const insertQuery = `
        INSERT INTO "sistema.usuario" (cpf, nome, data_nascimento) VALUES ($1, $2, $3) RETURNING *;
      `;
                const result = yield Database_1.default.query(insertQuery, [
                    cpf,
                    nome,
                    data_nascimento,
                ]);
                res.status(201).json(result.rows[0]);
            }
            catch (error) {
                console.error("Erro ao criar usuário:", error);
                res.status(500).json({ error: "Erro interno no servidor" });
            }
        });
    }
    getUserByCpf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cpf = req.params.cpf;
                // Utilize o método query para obter o usuário pelo CPF
                const selectQuery = `
        SELECT * FROM "sistema.usuario" WHERE cpf = $1;
      `;
                const result = yield Database_1.default.query(selectQuery, [cpf]);
                if (result.rows.length === 0) {
                    res.status(404).json({ error: "Usuário não encontrado" });
                    return;
                }
                res.json(result.rows[0]);
            }
            catch (error) {
                console.error("Erro ao obter usuário:", error);
                res.status(500).json({ error: "Erro interno no servidor" });
            }
        });
    }
}
exports.UserController = UserController;
