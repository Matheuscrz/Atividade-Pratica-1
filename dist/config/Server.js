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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const Database_1 = __importDefault(require("./Database"));
const Routes_1 = require("../routes/Routes");
const ErroMiddleware_1 = require("../middlewares/ErroMiddleware");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || "3000", 10);
        this.routes = new Routes_1.Routes();
        this.setup();
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Database_1.default.initialize();
                yield Database_1.default.connect();
            }
            catch (error) {
                console.error("Falha ao conectar-se ao banco de dados:", error);
                process.exit(1); // Se não conseguir conectar, encerra o aplicativo
            }
            this.app.use(express_1.default.json());
            this.app.use(ErroMiddleware_1.ErrorHandlerMiddleware.handle);
            this.app.use(this.routes.getRouter());
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor rodando na porta: ${this.port}`);
        });
    }
}
exports.Server = Server;
