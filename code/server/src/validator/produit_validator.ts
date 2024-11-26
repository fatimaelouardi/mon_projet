import Joi, { type ValidationError } from "joi";
import type Produit from "../models/produit_model.js";

class ProduitValidator {
	// valider les données d'un véhicule
	public async validate(data: Produit): Promise<unknown | ValidationError> {
		// contraasync intes de validation
		// reprendre les propriétés du modèle
		const constraints = Joi.object({
			// si l'id est undefined la valeur 0 et utilisée ou une chaine de caractère 
         
			id_produit: Joi.number().min(0).allow(""),
			nom: Joi.string().min(2).max(50).required(),
			description: Joi.string().min(2).max(50).required(),
			prix: Joi.string().min(2).max(50).required(),
			theme: Joi.string().min(2).max(50).required(),
			genre: Joi.string().min(2).max(50).required(),
			image: Joi.string().allow(),
		});

		try {
            // c'est pour avoir toute les erreur, de base il donne les erreur une par une
			const validation = await constraints.validateAsync(data, { abortEarly: false });

			return validation;
		} catch (error) {
			return error;
		}
	}
}

export default ProduitValidator;
