import { describe, expect, it } from "vitest";
import { ValidationError } from "joi";
import  ProduitValidator  from "../../src/validator/produit_validator";
import type Produit from "../../src/models/produit_model";

//  créer une suite de tests

describe("image validator tests suite", () => {
	// créer des fausses données
	const data: Produit = {
		id_produit: 1,
		nom: "t-shirt",
		description: "description",
		prix: 100,
		theme: "casual",
		genre: "homme",
		image: "th.jpeg",
	};
	// sut: system under test, methode ou la fonction testée
	const sut: ProduitValidator = new ProduitValidator();

	// creer un test
	it("should return true", async () => {
		// comment obtenir la valeur attendue
		const actual = await sut.validate(data);

		// assertion
		// chai : accès directement a des méthodes d'insertions
		// jest: assertion débute par to...
		expect(actual).toBeTruthy();
	});

	it("should return an error", async () => {
		// données renvoyant une erreur
		const falseData: Produit = {
			...data,
			id_produit: 0,
			nom: "heml",
		};
		// comment obtenir la valeur attendue
		const actual = await sut.validate(falseData);

		// assertion
		expect(actual).toBeInstanceOf(ValidationError);
	});
});