import express, { type Router } from "express";
import ProduitController from "../controller/produit_controller.js";
import AuthorizationMiddleware from "../middleware/security/authorization._middleware.js";

class ProduitRouter {
    private router: Router = express.Router();

    public getRouter = (): Router => {
        // Route protégée, seule l'utilisateur avec le rôle "admin" ou "user" peut y accéder
        this.router.get("/", new ProduitController().index);

        // Autres routes pour gérer les produits...
        this.router.get("/:id", new ProduitController().one);

        // Création d'un produit (par un administrateur)
        this.router.post("/",  new ProduitController().create);

        // Mise à jour d'un produit (par un administrateur)
        this.router.put("/:id", new ProduitController().update);

        // Suppression d'un produit (par un administrateur)
        this.router.delete("/:id", new AuthorizationMiddleware().authorize(["admin"]), new ProduitController().delete);

        return this.router;
    };
}

export default ProduitRouter;
