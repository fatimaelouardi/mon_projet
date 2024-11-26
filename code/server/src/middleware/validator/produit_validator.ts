import type { NextFunction, Request, Response } from "express";
import type Joi from "joi";
import type { ValidationError } from "joi";
import ProduitValidator from "../../validator/produit_validator.js";

class ProduitValidatorMiddleware {
    // Méthode pour valider les données du produit
    public filter = async (req: Request, res: Response, next: NextFunction) => {
        // Validation des données de la requête en utilisant le validateur Produit
        const validation = await new ProduitValidator().validate(req.body);

        // Si une erreur de validation est renvoyée
        if (validation instanceof Error) {
            return res.status(400).json({
                status: 400,
                message: "Error",
                data: (validation as ValidationError).details.map(
                    (value: Joi.ValidationErrorItem) => value.message,
                ),
            });
        }

        console.log(validation); // Affiche la validation réussie dans la console, peut être retiré en prod

        // Si la validation est réussie, passer au middleware suivant
        next();
    };
}

export default ProduitValidatorMiddleware;
