// import express, { type Router } from "express";
// import TailleController from "../controller/taille_controller.js";
// import AuthorizationMiddleware from "../middleware/security/authorization._middleware.js";

// class TailleRouter {
//     private router: Router = express.Router();
//     private tailleController: TailleController;
//     private authorizationMiddleware: AuthorizationMiddleware;

//     constructor() {
//         this.tailleController = new TailleController();
//         this.authorizationMiddleware = new AuthorizationMiddleware();
//     }

//     public getRouter = (): Router => {
//         // Route pour récupérer toutes les tailles des produits
//         this.router.get("/", this.tailleController.index);

//         // Route pour récupérer les tailles d'un produit spécifique par ID
//         this.router.get("/:id", this.tailleController.one);

//         // Création d'une association produit-taille (par un administrateur)
//         this.router.post("/", 
//             this.authorizationMiddleware.authorize(["admin"]), 
//             this.tailleController.create
//         );

//         // Suppression d'une association produit-taille (par un administrateur)
//         this.router.delete("/:id_produit/:id_taille", 
//             this.authorizationMiddleware.authorize(["admin"]), 
//             this.tailleController.delete
//         );

//         return this.router;
//     };
// }

// export default TailleRouter;
