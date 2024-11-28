import express, { type Router, type Express, Request, Response } from "express";
import http from "node:http";
import ProduitRouter from "../router/produit_router.js";  // Le routeur des produits
import SecurityRouter from "../router/security_router.js";  // Routeur pour gérer la sécurité
import cors from "cors";  // Middleware CORS pour gérer les accès
import OriginMiddleware from "../middleware/security/origin_middleware.js";
// import TailleRouter from "../router/taille_router.js";

class Server {
    private app: Express = express();  // Application Express
    private router: Router = express.Router();  

    constructor() {
        // Middleware pour parser le corps des requêtes en JSON
        this.router.use(express.json());

        // dossier stockant les ressources publiques 

        this.router.use(express.static(process.env.ASSETS_DIRECTORY as string));

        // Middleware CORS pour gérer les origines autorisées
        this.router.use(
            cors({
                origin: process.env.ORIGINS?.split(","),  // Autoriser les origines spécifiées dans l'environnement
            })
        );

        // Vérifier l'origine des requêtes via OriginMiddleware
        this.router.use(new OriginMiddleware().check);

        // Lier l'application au router principal
        this.app.use(this.router);

        // Lister les routeurs
        this.listRouters();
    }

    // Méthode pour lier les différents routeurs à leurs préfixes
    private listRouters = (): void => {
        // Routeur pour gérer les produits
        this.router.use("/produit", new ProduitRouter().getRouter());
        // this.router.use("/taille", new TailleRouter().getRouter());

        // Routeur pour gérer la sécurité (authentification, autorisation)
        this.router.use("/", new SecurityRouter().getRouter());
    };

    // Méthode pour créer et retourner le serveur HTTP
    public createServer = (): http.Server => {
        return http.createServer(this.app);  // Créer et retourner le serveur HTTP
    };
}

export default Server;
