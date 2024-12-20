import type { Pool } from "mysql2/promise"; 
import MySQLService from "../service/mysql_service.js";
import type { RowDataPacket, FieldPacket } from "mysql2";
import type User from "../models/user_model.js";

class SecurityRepository {
    private mySQLService = new MySQLService();
    private table = "utilisateur";

    // Enregistrer un utilisateur avec un rôle
    public register = async (data: User) => {
        // console.log("Début de l'enregistrement de l'utilisateur");

        const pool: Pool = await this.mySQLService.connect();  
        let connection;

        try {
            // Obtenir une connexion spécifique à partir du Pool
            connection = await pool.getConnection();
            // console.log("Connexion obtenue");

            // Démarrer une transaction sur la connexion
            await connection.beginTransaction();
            // console.log("Transaction commencée");

            // Insérer l'utilisateur avec le rôle par défaut 
            const query = `INSERT INTO ${process.env.MYSQL_DB}.${this.table} (nom, email, mot_de_passe, telephone, id_role)
                VALUES (?, ?, ?, ?, ?);`;

        // console.log("Mot de passe reçu dans le repository (normalement haché):", data.mot_de_passe);
        


            const [results] = await connection.execute(query, [
                data.nom,
                data.email,
                data.mot_de_passe,
                data.telephone,
                data.id_role || 2, 
            ]);
            // console.log("Utilisateur enregistré avec succès", results);

            // Commit de la transaction 
            await connection.commit();
            // console.log("Transaction validée");

            return results;
        } catch (error) {
            // Si une erreur survient, rollback pour annuler la transaction
            if (connection) {
                await connection.rollback(); 
            }
            console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
            return { message: "Erreur d'enregistrement", error }; 
        } finally {
            if (connection) {
                connection.release();  
                // console.log("Connexion libérée");
            }
        }
    };

    // Récupérer un utilisateur par son email avec son rôle
    public getUserByEmail = async (data: User): Promise<User | Error> => {
        // Vérification des paramètres `email` et `mot_de_passe`
		// console.log("Données reçues dans getUserByEmail:", data);
        if (!data.email || !data.mot_de_passe) {
            console.log("Erreur: email ou mot_de_passe manquant");
            return new Error("L'email et le mot de passe sont requis.");
        }
    
        const pool: Pool = await this.mySQLService.connect();  // Utiliser le Pool
        let connection;
    
        try {
            // Obtenir une connexion spécifique à partir du Pool
            connection = await pool.getConnection();
    
            // Afficher les données de la requête pour vérifier les valeurs
            // console.log("Données de la requête:", data.email, data.mot_de_passe);
    
            const query = `SELECT id_utilisateur, nom, email, mot_de_passe, telephone, id_role
                FROM ${process.env.MYSQL_DB}.${this.table}
                WHERE email = ?;`;
    
            const [results]: [RowDataPacket[], FieldPacket[]] = await connection.execute(query, [data.email]);
    
            // Si aucun utilisateur n'est trouvé
            if (results.length === 0) {
                // console.log("Utilisateur non trouvé");
                return new Error("Utilisateur non trouvé");
            }
    
            return results[0] as User;
    
            // // Vérification du mot de passe en utilisant Argon2
   
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur:", error);
            return error as Error;
        } finally {
            if (connection) {
                connection.release();  
            }
        }
    };
    
    
    
}

export default SecurityRepository;
