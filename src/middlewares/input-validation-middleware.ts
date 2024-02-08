import {Request, Response} from "express";
import {validationResult} from "express-validator";

export const validationMiddleware = (req: Request, res: Response, next: () => void) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.sendStatus(422).json({errors: errors.array()});
    } else {
        next();
    }
}