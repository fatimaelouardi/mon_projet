import MySQLService from "../service/mysql_service.js";
import type { RowDataPacket, FieldPacket } from "mysql2";

class RoleRepository {
    private mySQLService = new MySQLService();
    private table = "Role";

    // Récupérer un rôle par son ID
    public getRoleById = async (roleId: number) => {
        const connection = await (await this.mySQLService.connect()).getConnection(); // Récupérer une connexion spécifique
        const query = `
            SELECT id_role, name  
            FROM ${process.env.MYSQL_DB}.${this.table}
            WHERE id_role = ?;
        `;
    
        try {
            const [results]: [RowDataPacket[], FieldPacket[]] = await connection.execute(query, [roleId]);
    
            if (results.length === 0) {
                return new Error("Rôle non trouvé");
            }
    
            return results[0]; // Retourne l'objet contenant id_role et name
        } catch (error) {
            return error;
        } finally {
            connection.release(); // Libérer la connexion directement sans vérifier son type
        }
    };
}

export default RoleRepository;
