import type { Request, Response } from "express";
import TailleRepository from "../repository/taille_repository.js";

class TailleController {
    private tailleRepository: TailleRepository = new TailleRepository();

    // Récupérer toutes les tailles pour tous les produits
    public index = async (req: Request, res: Response): Promise<Response> => {
        console.log("Request to /taille received");  // Pour voir si la requête arrive
        try {
            const results = await this.tailleRepository.selectAll();
            if (results instanceof Error) {
                console.error("Error in retrieving sizes:", results);  // Log détaillé en cas d'erreur
                return res.status(500).json({ status: 500, message: "Internal Server Error", error: results });
            }
            return res.status(200).json({
                status: 200,
                message: "OK",
                data: results,
            });
        } catch (error) {
            console.error("Error in index controller:", error);  // Log l'erreur de toute l'exécution
            return res.status(500).json({ status: 500, message: "Internal Server Error", error: error });
        }
    };
    

    // Récupérer les tailles d'un produit par son identifiant
    public one = async (req: Request, res: Response): Promise<Response> => {
        const id_produit = Number.parseInt(req.params.id, 10);

        if (isNaN(id_produit) || id_produit <= 0) {
            return res.status(400).json({
                status: 400,
                message: "Invalid Product ID. It must be a positive integer.",
            });
        }

        try {
            const results = await this.tailleRepository.selectByProduitId({ id_produit });

            if (results instanceof Error) {
                return this.handleError(res, results);
            }

            return res.status(200).json({
                status: 200,
                message: "OK",
                data: results,
            });
        } catch (error) {
            return this.handleError(res, error);
        }
    };

    // Créer une nouvelle association produit-taille
    public create = async (req: Request, res: Response): Promise<Response> => {
        const { id_produit, id_taille } = req.body;

        if (!id_produit || !id_taille) {
            return res.status(400).json({
                status: 400,
                message: "Missing id_produit or id_taille in request body",
            });
        }

        try {
            const results = await this.tailleRepository.create({ id_produit, id_taille });

            if (results instanceof Error) {
                return this.handleError(res, results);
            }

            return res.status(201).json({
                status: 201,
                message: "Produit-Taille Association Created",
                data: results,
            });
        } catch (error) {
            return this.handleError(res, error);
        }
    };

    // Supprimer une association produit-taille
    public delete = async (req: Request, res: Response): Promise<Response> => {
        const { id_produit, id_taille } = req.params;

        if (!id_produit || !id_taille) {
            return res.status(400).json({
                status: 400,
                message: "Missing id_produit or id_taille in request parameters",
            });
        }

        try {
            const results = await this.tailleRepository.delete({
                id_produit: Number(id_produit),
                id_taille: Number(id_taille),
            });

            if (results instanceof Error) {
                return this.handleError(res, results);
            }

            return res.status(200).json({
                status: 200,
                message: "Produit-Taille Association Deleted",
                data: results,
            });
        } catch (error) {
            return this.handleError(res, error);
        }
    };

    // Gestion des erreurs
    private handleError = (res: Response, error: unknown) => {
        console.error("Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    };
}

export default TailleController;
