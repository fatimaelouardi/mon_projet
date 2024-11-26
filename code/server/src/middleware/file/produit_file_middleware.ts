import type { NextFunction, Request, Response } from "express";
import type File from "../../models/file_model.js";
import fs from "node:fs/promises";




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


            //? si une image a été sélectionnée

            if((req.files as []).length  > 0 ) {
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
                
                
                
            }

            next();

            
                
    }

}


export default ProduitFileMiddleware;