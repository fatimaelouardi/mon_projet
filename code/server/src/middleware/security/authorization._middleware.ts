import jwt, { type JwtPayload } from "jsonwebtoken";

class AuthorizationMiddleware {
    public authorize = (roles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization?.split(" ")[1]; // Récupère le token dans l’en-tête

            if (!token) {
                return res.status(403).json({ 
                    status: 403,
                    message: "Forbidden: No token provided",
                });
            }

            try {
                // Vérifie le token avec la clé secrète
                const data: JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

                if (!roles.includes(data.id_role)) {
                    return res.status(403).json({
                        status: 403,
                        message: "Forbidden: Insufficient role",
                    });
                }

                next(); // Passe au middleware suivant si tout est bon
            } catch (error) {
                console.error("Erreur de vérification du token :", error);
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorized: Token verification failed",
                });
            }
        };
    };
}

export default AuthorizationMiddleware;
