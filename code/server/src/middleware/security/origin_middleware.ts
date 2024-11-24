import type { NextFunction, Request, Response } from "express";

class OriginMiddleware {
    public check = (req: Request, res: Response, next: NextFunction) => {
        const origin = req.get("origin");

        // Si aucune origine, passer directement (requêtes internes)
        if (!origin) {
            return next();
        }

        // Charger la liste des origines autorisées
        const originEnv = process.env.ORIGINS;
        if (!originEnv) {
            console.error("Error: ORIGINS environment variable is not set.");
            return res.status(500).json({
                status: 500,
                message: "Server error: Origins not configured",
            });
        }

        const allowedOrigins = new Set(originEnv.split(","));

        // Vérification de l'origine
        if (!allowedOrigins.has(origin)) {
            console.warn(`Forbidden request from origin: ${origin}`);
            return res.status(403).json({
                status: 403,
                message: "Forbidden: Origin not allowed",
            });
        }

        // Origine valide
        next();
    };
}

export default OriginMiddleware;
