"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new UserController_1.UserController();
        this.setupRoutes();
    }
    getRouter() {
        return this.router;
    }
    setupRoutes() {
        this.router.post("/users", this.userController.createUser);
        this.router.get("/users/:cpf", this.userController.getUserByCpf);
    }
}
exports.Routes = Routes;
