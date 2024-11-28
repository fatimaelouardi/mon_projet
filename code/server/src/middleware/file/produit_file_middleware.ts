import type { NextFunction, Request, Response } from "express";
import type File from "../../models/file_model.js";
import fs from "node:fs/promises";
import Produit from "../../models/produit_model.js";
import ProduitRepository from "../../repository/produit_repository.js";




class ProduitFileMiddleware {


    public process = async (req: Request, res: Response, next: NextFunction) => {

        /*
            console.log(req.files); =>
        [
             {
                fieldname: 'image',
                originalname: 'hello.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                destination: 'public/images',
                filename: 'f39abb684c0ec9988a25b5a972758939',
                path: 'public/images/f39abb684c0ec9988a25b5a972758939',
                size: 7283443
            }
            ]
        */

            // todo récupérer le produit mis à our ou supprimé 


            const produit:Produit | unknown = await new ProduitRepository().selectOne({id: req.params.id as unknown as number});



            //? si une image a été sélectionnée

            if(req.files && (req.files as []).length  > 0 ) {
                const file = (req.files as File[]).shift() as File;
                // console.log(file);
                const extension:string = file.mimetype.split('/')[1];
                // console.log(extension);

                const filename = `${file.filename}.${extension}`;
                // console.log(filename);

                //todo renommer le fichier transféré

                await fs.rename(file.path, `${file.destination}/${filename}`);


                //todo Utiiser le nom du fichier pour la propriété gérant l'images 
                req.body.image = filename;
                
                // todo si un produit est mis à jour supprimer l'ancien fichier  stocké dans la base de donnée 

                if (req.method === 'PUT') {
                    await fs.rm( `${process.env.ASSETS_DIRECTORY}/images/${(produit as Produit).image}`);
                }
                
            }
             //? si aucune  image n'a été sélectionnée

             else {
                // todo récupérer le nom de l'image déjà été existante en bdd

                if (req.method === 'PUT') {
                    req.body.image = (produit as Produit).image;
                }
             }
            

            // passer au middlware suivant 
            next();

            
                
    }

}


export default ProduitFileMiddleware;