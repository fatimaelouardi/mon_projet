import mysql, { type Pool } from "mysql2/promise";

// On importe le module mysql de node (npm i mysql2)
class MySQLService {
    // connexio unique
    public static connection: Pool;

    // créer une connexion au serveur MySQL
    public connect = async (): Promise<Pool> => {
        // si aucune connexion n'existe
        if (!MySQLService.connection) {
            // créer un objet de configuration
            MySQLService.connection = mysql.createPool({
                host: process.env.MYSQL_HOST,
                database: process.env.MYSQL_DB,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                // permet de créer des requêtes préparé
                namedPlaceholders: true,
            });
        }

        return MySQLService.connection;
    };
}

export default MySQLService;