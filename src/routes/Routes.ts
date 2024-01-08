import express from "express";
import UserController from "../controllers/UserController";

class Routes {
  private router: express.Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    const userController = new UserController();

    this.router.use("/usuario", userController.getRouter());
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default Routes;
