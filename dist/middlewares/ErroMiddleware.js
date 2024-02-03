"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
class ErrorHandlerMiddleware {
    static handle(err, req, res, next) {
        console.error(err.stack);
        if (err instanceof SyntaxError && "body" in err) {
            res.status(400).json({ error: "Bad Request - JSON Mal Formatado" });
        }
        else {
            res.status(500).json({ error: "Erro interno no Servidor" });
        }
    }
}
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
