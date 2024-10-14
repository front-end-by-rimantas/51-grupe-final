import { NextFunction, Request, Response } from "express";

export function fatalServerErrorResponse(err: Error, _req: Request, res: Response, _next: NextFunction) {
    console.error(err.stack);
    return res.status(500).send('Something broke!');
}