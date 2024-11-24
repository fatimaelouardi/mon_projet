// user_model.ts
import type Role from "./role_model.js";

type User = {
    id_utilisateur?: number;
    email?: string;
    mot_de_passe?: string;
    id_role?: number;  // Clé étrangère vers la table Role
    role?: Role | unknown; // Role de l'utilisateur (relation avec la table Role)
    nom?: string;
    telephone?: string;
    key?: String;
};

export default User;
