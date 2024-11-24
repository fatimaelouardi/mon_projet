// router/security_router.ts
import express, { type Router } from "express";
import SecurityController from "../controller/security_controller.js";  // Ton contrôleur de sécurité

class SecurityRouter {
    private router: Router = express.Router();
    private securityController: SecurityController = new SecurityController();

    constructor() {
        // Lier les routes aux méthodes du contrôleur
        this.router.post ("/register", this.securityController.register);
        this.router.post("/login", this.securityController.login);
        this.router.post("/auth", this.securityController.auth);
    }

    // Méthode pour retourner le routeur
    public getRouter(): Router {
        return this.router;
    }
}

export default SecurityRouter;
