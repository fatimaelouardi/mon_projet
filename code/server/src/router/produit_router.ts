import express, { type Router } from "express";
import ProduitController from "../controller/produit_controller.js";
import multer from "multer";
import ProduitFileMiddleware from "../middleware/file/produit_file_middleware.js";
import AuthorizationMiddleware from "../middleware/security/authorization._middleware.js";


class ProduitRouter {
    private router: Router = express.Router();

    // définir le dossier de transfert des images 

    private upload:multer.Multer = multer({dest: `${process.env.ASSETS_DIRECTORY}/images`});

    public getRouter = (): Router => {
        // Route protégée, seule l'utilisateur avec le rôle "admin" ou "user" peut y accéder
        this.router.get("/", new ProduitController().index);

        this.router.get("/:id", new ProduitController().one);



        // middlware any de multer permet d'acéder aux fichiers transférés avec req.files 



        // Création d'un produit (par un administrateur)
        this.router.post("/", this.upload.any(),   new ProduitFileMiddleware().process, new AuthorizationMiddleware().authorize([1]),   new ProduitController().create);

        // Mise à jour d'un produit (par un administrateur)
        this.router.put("/:id", new ProduitController().update);

        // Suppression d'un produit (par un administrateur)
        this.router.delete("/:id", new ProduitController().delete);

        return this.router;
    };
}

export default ProduitRouter;
