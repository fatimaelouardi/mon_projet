import express, { type Router, type Express, Request, Response } from "express";
import http from "node:http";
import ProduitRouter from "../router/produit_router.js";  
import SecurityRouter from "../router/security_router.js";  
import cors from "cors";  
import OriginMiddleware from "../middleware/security/origin_middleware.js";

class Server {
    private app: Express = express();  
    private router: Router = express.Router();  

    constructor() {
        this.router.use(express.json());


        this.router.use(express.static(process.env.ASSETS_DIRECTORY as string));

        // Middleware CORS pour gérer les origines autorisées
        this.router.use(
            cors({
                origin: process.env.ORIGINS?.split(","),  // Autoriser les origines spécifiées dans l'environnement
            })
        );

        this.router.use(new OriginMiddleware().check);

        this.app.use(this.router);

        this.listRouters();
    }

    private listRouters = (): void => {
        this.router.use("/produit", new ProduitRouter().getRouter());

        this.router.use("/", new SecurityRouter().getRouter());
    };

    public createServer = (): http.Server => {
        return http.createServer(this.app);  
    };
}

export default Server;
