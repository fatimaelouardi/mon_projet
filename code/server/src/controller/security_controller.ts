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

public register = async (req: Request, res: Response): Promise<Response> => {
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

        return res.status(201).json({ status: 201, message: "Utilisateur créé avec succès" });
        
    } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        return res.status(500).json({ message: "Erreur serveur" });
      
    }
};




    // Méthode de connexion
  // Méthode de connexion
public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
        return res.status(400).json({ message: "Email et mot de passe sont requis" });
    }

    try {
        const user = await this.securityRepository.getUserByEmail({ email });
        if (user instanceof Error) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Générer un token JWT
        // const token = jwt.sign(
        //     { id_utilisateur: user.id_utilisateur, email: user.email, id_role: user.id_role },
        //     process.env.JWT_SECRET as string,
        //     { expiresIn: '1h' }
        // );

        // Crypter le mot de passe avec une clé aléatoire
        const randomKey = SimpleCrypto.default.generateRandom();
        const key = `${randomKey}${process.env.KEY}`;
        const simpleCrypto = new SimpleCrypto.default(key);
        const encryptedPassword = simpleCrypto.encrypt(req.body.mot_de_passe);

        // Ajouter la clé aléatoire et mot de passe crypté à la réponse
        (user as User).key = randomKey;
        (user as User).mot_de_passe = encryptedPassword;

        return res.status(200).json({
            status: 200,
            message: "Connexion réussie",
            user: user  // Retourne le token JWT
        });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};




    // Méthode d'authentification
public auth = async (req: Request, res: Response): Promise<Response> => {
    // const { email, mot_de_passe, key } = req.body;

    // if (!email || !mot_de_passe || !key) {
    //     return res.status(400).json({ message: "Email, mot de passe et clé sont requis" });
    // }

    // try {
        // récupérer l'utilisateur à partir de l'email

        // console.log(req.body);
        
        const user = await this.securityRepository.getUserByEmail(req.body);
        if (user instanceof Error) {
            return res.status(404).json({ status: 404, message: "Utilisateur non trouvé" });
        }

        // écryptage du mot de passe
        const randomKey = req.body.key;
        const key = `${randomKey}${process.env.KEY}`;  
        const simpleCrypto = new SimpleCrypto.default(key);
        const decryptedPassword = simpleCrypto.decrypt(req.body.mot_de_passe);

        // console.log(req.body.mot_de_passe);
        
        // console.log("Mot de passe décrypté:", decryptedPassword);

        // vérifier si le mot de passe décrypté correspond au mot de passe haché
        const isPasswordValid = await argon2.verify((user as User).mot_de_passe as string, decryptedPassword as string);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // générer un token JWT
        const token = jwt.sign(
             
           {
            user:user,
           },
           process.env.JWT_SECRET as string,
           {
                expiresIn:"30s"
           }
        );

        

        return res.status(200).json({
            status: 200,
            message: "Authentification réussie",
            data: {
                token: token,
            }
        });
    // } catch (error) {
    //     console.error("Erreur lors de l'authentification:", error);
    //     res.status(500).json({ message: "Erreur serveur" });
    // }
};

    
    

   
}

export default SecurityController;
