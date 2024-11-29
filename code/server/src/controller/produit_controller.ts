import type { Request, Response } from "express";
import ProduitRepository from "../repository/produit_repository.js";

class ProduitController {
    private produitRepository: ProduitRepository = new ProduitRepository();

    // Récupérer tous les produits
    public index = async (req: Request, res: Response): Promise<void> => {
        const results = await this.produitRepository.selectAll();
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: "Error",
            });
            return;
        }
    
        res.status(200).json({
            status: 200,
            message: "OK",
            data: results,
        });
    };
    

    // Récupérer un seul produit par son identifiant
    public one = async (req: Request, res: Response): Promise<void> => {
        const id = Number.parseInt(req.params.id, 10);
    
        if (Number.isNaN(id)) {
            res.status(400).json({
                status: 400,
                message: "Invalid ID parameter",
            });
            return;
        }
    
        const results = await this.produitRepository.selectOne({ id });
    
        if (results instanceof Error) {
            res.status(400).json({
                status: 400,
                message: "Error",
            });
            return;
        }
    
        res.status(200).json({
            status: 200,
            message: "OK",
            data: results,
        });
    };
    
    

    // Créer un nouveau produit
    public create = async (req: Request, res: Response): Promise<void> => {
        const results = await this.produitRepository.create(req.body);

        if (results instanceof Error) {
             process.env.NODE_ENV === "dev"
                ? res.json(results)
                : res.status(400).json({
                      status: 400,
                      message: "Error",
                  });
                  return;
        }

         res.status(201).json({
            status: 201,
            message: "Produit Created",
            data: results,
        });
        return;
    };

    // Mettre à jour un produit
    public update = async (req: Request, res: Response): Promise<void> => {
        const data = { ...req.body, id_produit: req.params.id };

        const results = await this.produitRepository.update(data);

        if (results instanceof Error) {
             process.env.NODE_ENV === "dev"
                ? res.json(results)
                : res.status(400).json({
                      status: 400,
                      message: "Error",
                  });
                  return;
        }

         res.status(200).json({
            status: 200,
            message: "Produit Updated",
            data: results,
        });
        return;
    };

    // Supprimer un produit
    public delete = async (req: Request, res: Response): Promise<void> => {
        const results = await this.produitRepository.delete({
            id_produit: req.params.id as unknown as number,
        });

        if (results instanceof Error) {
             process.env.NODE_ENV === "dev"
                ? res.json(results)
                : res.status(400).json({
                      status: 400,
                      message: "Error",
                  });
                  return;
        }

         res.status(200).json({
            status: 200,
            message: "Produit Deleted",
            data: results,
        });
        return;
    };
}

export default ProduitController;
