import type { NextFunction, Request, Response } from "express";

class OriginMiddleware {
    public check = (req: Request, res: Response, next: NextFunction): void => {
        const hostname: string = req.hostname;
        const origin: string = req.get("origin") as string;

        const listOrigins = (process.env.ORIGINS as string).split(",");

        if (listOrigins.indexOf(origin) === -1 && origin !== undefined) {
            res.status(403).json({
                status: 403,
                message: "Forbidden: Origin not allowed",
            });
        } else {
            next(); 
        }
    };
}

export default OriginMiddleware;
