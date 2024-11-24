// controller/security_controller.ts
import type { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import SecurityRepository from "../repository/security_repository.js";
import argon2 from 'argon2'
import SimpleCrypto from "simple-crypto-js";
import type User from "../models/user_model.js";

class SecurityController {
    private securityRepository: SecurityRepository;

    constructor() {
        this.securityRepository = new SecurityRepository();
    }

    // Méthode pour enregistrer un utilisateur

public register = async (req: Request, res: Response): Promise<void> => {
    const { email, mot_de_passe, nom, telephone } = req.body;

    // Vérification des champs requis
    if (!email || !mot_de_passe || !nom || !telephone) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
        // Hacher le mot de passe avant de l'envoyer au repository
        const hashedPassword = await argon2.hash(mot_de_passe);

        // Appeler le repository avec le mot de passe haché
        const user = await this.securityRepository.register({
            email,
            mot_de_passe: hashedPassword, // Utiliser le mot de passe haché
            nom,
            telephone
        });

        res.status(201).json({ status: 201, message: "Utilisateur créé avec succès" });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};




    // Méthode de connexion
    public login = async (req: Request, res: Response): Promise<void> => {
        const { email, mot_de_passe } = req.body;
    
        if (!email || !mot_de_passe) {
            return res.status(400).json({ message: "Email et mot de passe sont requis" });
        }
    
        try {
            const user = await this.securityRepository.getUserByEmail({ email, mot_de_passe });
            if (user instanceof Error) {
                return res.status(404).json({ message: "c la" });
            }
    
            // Générer un token JWT
            const token = jwt.sign(
                { id_utilisateur: user.id_utilisateur, email: user.email, id_role: user.id_role },
                process.env.JWT_SECRET as string,  // Utilise une clé secrète pour signer le token
                { expiresIn: '1h' }  // Le token expire après 1 heure
            );
    
            // Exclure le mot de passe de la réponse
            const { mot_de_passe: _, ...userWithoutPassword } = user;
            //  crypter le mot de passe pour le stocker cote client 
            // générer une partie de clé de décryptage d'une maniere aléatoire

            const randomKey = SimpleCrypto.default.generateRandom();

            //  clé copmlète de décryptage : partie aléatoire + la partie stocké das la variable d'envirenement 

            const key = `${randomKey}${process.env.KEY}`;

            // générer le cryptage 

            const simpleCrypto = new SimpleCrypto.default(key);

            // crypter le mot de passe 
            const passwordEncrypt = simpleCrypto.encrypt(mot_de_passe);

        //    console.log(passwordEncrypt); et post login

            // ajouter la clé aléatoire et le mot de passe crypté à l'utilisateur 

            (user as User).key = randomKey;
            (user as User).mot_de_passe = passwordEncrypt;

            
           
            res.status(200).json({ status: 200, message: "login user suc", user: user });
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    };



    public auth = async (req: Request, res: Response): Promise<void> => {
        const { email, mot_de_passe } = req.body;
    
        if (!email || !mot_de_passe) {
            return res.status(400).json({ message: "Email et mot de passe sont requis" });
        }
    
        try {
            console.log("Email reçu:", email);
            console.log("Mot de passe reçu:", mot_de_passe);
    
            // Récupérer l'utilisateur à partir de l'email
            const user = await this.securityRepository.getUserByEmail({ email });
            if (user instanceof Error) {
                return res.status(404).json({ status: 404, message: "Utilisateur non trouvé" });
            }
    
            // Décryptage du mot de passe envoyé dans la requête
            const randomKey = req.body.key;
            const key = `${randomKey}${process.env.KEY}`;
            const simpleCrypto = new SimpleCrypto.default(key);
            const passwordDecrypt = simpleCrypto.decrypt(mot_de_passe);
            console.log("Mot de passe décrypté:", passwordDecrypt);
    
            // Vérifier si le mot de passe décrypté correspond au mot de passe haché
            const isPasswordValid = await argon2.verify(user.mot_de_passe as string, passwordDecrypt);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }
    
            // Générer un token JWT
            const token = jwt.sign(
                { id_utilisateur: user.id_utilisateur, email: user.email, id_role: user.id_role },
                process.env.JWT_SECRET as string,  // Utilise une clé secrète pour signer le token
                { expiresIn: '1h' }  // Le token expire après 1 heure
            );
    
            // Exclure le mot de passe de la réponse
            const { mot_de_passe: _, ...userWithoutPassword } = user;
    
            res.status(200).json({ status: 200, message: "Connexion réussie", user: userWithoutPassword, token });
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    };
    
    

   
}

export default SecurityController;
