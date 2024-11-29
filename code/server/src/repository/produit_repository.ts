import type {
	FieldPacket,
	Pool,
	QueryResult,
} from "mysql2/promise";
import MySQLService from "../service/mysql_service.js";
import Produit from "../models/produit_model.js";


class ProduitRepository {
	// Accéder au service MYSQL
	private mySQLService = new MySQLService();

	// Table utilisée par la classe
	private table = "produit";

	// Sélection de tous les produits
	public selectAll = async (): Promise<QueryResult | unknown | Produit[]> => {
		const connection: Pool = await this.mySQLService.connect();

		const query = `
        SELECT *
        FROM ${process.env.MYSQL_DB}.${this.table}
        ;`;

		try {
			const results = await connection.execute(query);
			const fullResults = results.shift() as Produit[];
			return fullResults;
		} catch (error: unknown) {
			return error;
		}
	};

	// Sélection d'un produit par ID
	public selectOne = async (
		data: { id: number },
	): Promise<QueryResult | unknown | Produit> => {
		const connection: Pool = await this.mySQLService.connect();

		const query = `
        SELECT *
        FROM ${process.env.MYSQL_DB}.${this.table}
        WHERE id_produit = :id
        ;`;

		try {
			const results: [QueryResult, FieldPacket[]] = await connection.execute(query, data);
			const fullResults: Produit = (
				results.shift() as Produit[]
			).shift() as Produit;
			return fullResults;
		} catch (error: unknown) {
			return error;
		}
	};

	// Création d'un produit
	public create = async (data: Produit): Promise<QueryResult | unknown> => {
		const connection: Pool = await this.mySQLService.connect();

		const query = `
			INSERT INTO ${process.env.MYSQL_DB}.${this.table}
			(nom, description, prix, theme, genre, image)
			VALUES (:nom, :description, :prix, :theme, :genre, :image)
			;`;

		try {
			const results = await connection.execute(query, data);
			return results;
		} catch (error: unknown) {
			return error;
		}
	};

	// Mise à jour d'un produit
	public update = async (data: Produit): Promise<QueryResult | unknown> => {
		const connection: Pool = await this.mySQLService.connect();

		const query = `
			UPDATE ${process.env.MYSQL_DB}.${this.table}
			SET
				nom = :nom,
				description = :description,
				prix = :prix,
				theme = :theme,
				genre = :genre,
				image = :image
			WHERE id_produit = :id_produit
			;`;

		try {
			const results = await connection.execute(query, data);
			return results;
		} catch (error: unknown) {
			return error;
		}
	};

	// Suppression d'un produit
	public delete = async (data: { id_produit: number }): Promise<QueryResult | unknown> => {
		const connection: Pool = await this.mySQLService.connect();

		const query = `
			DELETE FROM ${process.env.MYSQL_DB}.${this.table}
			WHERE id_produit = :id_produit
			;`;

		try {
			const results = await connection.execute(query, data);
			return results;
		} catch (error: unknown) {
			return error;
		}
	};
}

export default ProduitRepository;
