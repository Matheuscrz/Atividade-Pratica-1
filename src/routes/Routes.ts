import { Router } from "express";
import { UserController } from "../controllers/UserController";

export class Routes {
  private router: Router = Router();
  private userController: UserController = new UserController();

  constructor() {
    this.setupRoutes();
  }

  getRouter(): Router {
    return this.router;
  }

  private setupRoutes(): void {
    this.router.post("/users", this.userController.createUser);
    this.router.get("/users/:cpf", this.userController.getUserByCpf);
  }
}
