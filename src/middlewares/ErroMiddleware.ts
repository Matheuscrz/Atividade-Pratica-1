import { Request, Response, NextFunction } from "express";

export class ErrorHandlerMiddleware {
  static handle(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.error(err.stack);

    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).json({ error: "Bad Request - JSON Mal Formatado" });
    } else {
      res.status(500).json({ error: "Erro interno no Servidor" });
    }
  }
}
