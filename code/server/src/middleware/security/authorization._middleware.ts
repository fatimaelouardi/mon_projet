import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

class AuthorizationMiddleware {
    // methode resevant la liste des roles autorisés
	public authorize = (roles: string[]) => {
        // console.log(roles);
        
        // retourner un middleware
        return (req: Request, res: Response, next: NextFunction) => {
            // recuperer le token contenu dans l'en tete authorization
            const token = (req.headers.authorization as string).split(" ")[1];
    

    
            // verifier la validité du token
            try {
                const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);
            } catch (error) {
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorized",
                });
            }
    
            // recuperer le payload du token
            const data = jwt.decode(token) as JwtPayload;
    
    
            // verification des autorisation
            // if (data.user.role.name !== "admin"){
            // chercher le role de l'utilisateur dans la liste des roles utiliser
            if (roles.indexOf(data.user.id_role) === -1){
                return res.status(401).json({
                    status: 401,
                    message: "Unauthorized"
                });
            }
            // passer au middleware suivant
            next();
        };

    }
    
}

export default AuthorizationMiddleware;
































































// import type { NextFunction, Request, Response } from "express";
// import jwt, { type JwtPayload } from "jsonwebtoken";

// class AuthorizationMiddleware {
//     public authorize = (roles: string[]) => {
//         return (req: Request, res: Response, next: NextFunction) => {
//             const token = req.headers.authorization?.split(" ")[1]; // Récupère le token dans l’en-tête

//             if (!token) {
//                 return res.status(403).json({ 
//                     status: 403,
//                     message: "Forbidden: No token provided",
//                 });
//             }  

//             try {
//                 // Vérifie le token avec la clé secrète
//                 const data: JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

//                 if (!roles.includes(data.id_role)) {
//                     return res.status(403).json({
//                         status: 403,
//                         message: "Forbidden: Insufficient role",
//                     });
//                 }
//                 // Passe au middleware suivant si tout est bon
//                 next(); 
//             } catch (error) {
//                 console.error("Erreur de vérification du token :", error);
//                 return res.status(401).json({
//                     status: 401,
//                     message: "Unauthorized: Token verification failed",
//                 });
//             }
//         };
//     };
// }

// export default AuthorizationMiddleware;
