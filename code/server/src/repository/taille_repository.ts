import type { Pool, QueryResult } from "mysql2/promise";
import MySQLService from "../service/mysql_service.js";

class TailleRepository {
    private mySQLService = new MySQLService();
    private table = "Taille";  // Assurez-vous que le nom de la table est correct

    // Sélection de toutes les tailles
    public selectAll = async (): Promise<QueryResult | unknown> => {
        const connection: Pool = await this.mySQLService.connect();
        const query = `
            SELECT * FROM \`${process.env.MYSQL_DB}\`.\`${this.table}\`
        `;
        try {
            const [results] = await connection.execute(query);
            return results; // Retour des résultats directement sans release()
        } catch (error: unknown) {
            console.error("Error fetching sizes from the database:", error);
            throw new Error("Error fetching all sizes");
        }
        // Pas besoin de release() ici.
    };

    // Sélection des tailles d'un produit par ID
    public selectByProduitId = async (data: { id_produit: number }): Promise<QueryResult | unknown> => {
        const connection: Pool = await this.mySQLService.connect();
        const query = `
            SELECT * FROM \`${process.env.MYSQL_DB}\`.\`${this.table}\`
            WHERE id_produit = :id_produit
        `;
        try {
            const [results] = await connection.execute(query, data);
            return results;  // Retourner les résultats
        } catch (error: unknown) {
            console.error("Error fetching sizes by product ID:", error);
            throw new Error("Error fetching sizes by product ID");
        }
        // Pas besoin de release() ici.
    };

    // Création d'une association produit-taille
    public create = async (data: { id_produit: number, id_taille: number }): Promise<QueryResult | unknown> => {
        const connection: Pool = await this.mySQLService.connect();
        const query = `
            INSERT INTO \`${process.env.MYSQL_DB}\`.\`${this.table}\`
            (id_produit, id_taille)
            VALUES (:id_produit, :id_taille)
        `;
        try {
            const [result] = await connection.execute(query, data);
            return result;  // Retourner l'objet d'insertion
        } catch (error: unknown) {
            console.error("Error creating product-size association:", error);
            throw new Error("Error creating product-size association");
        }
        // Pas besoin de release() ici.
    };

    // Suppression d'une association produit-taille
    public delete = async (data: { id_produit: number, id_taille: number }): Promise<QueryResult | unknown> => {
        const connection: Pool = await this.mySQLService.connect();
        const query = `
            DELETE FROM \`${process.env.MYSQL_DB}\`.\`${this.table}\`
            WHERE id_produit = :id_produit AND id_taille = :id_taille
        `;
        try {
            const [result] = await connection.execute(query, data);
            return result;  // Retourner l'objet de suppression
        } catch (error: unknown) {
            console.error("Error deleting product-size association:", error);
            throw new Error("Error deleting product-size association");
        }
        // Pas besoin de release() ici.
    };
}

export default TailleRepository;
