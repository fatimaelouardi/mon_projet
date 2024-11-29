import type { Request, Response } from "express";
import ContactRepository from "../repository/contact_repository.js";

class ContactController {
	// recuperation de tout les documents
	public index = async (req: Request, res: Response): Promise<void> => {

        const results = await new ContactRepository().findAll();

        res.status(200).json({
            status: 200,
            message: "OK",
            data: results,
        });
        return ;
    };

    public create = async (req: Request, res: Response): Promise<void> => {

        const results = await new ContactRepository().create(req.body);

        res.status(201).json({
            status: 201,
            message: "created",
        });
        return;
    };
}

export default ContactController;