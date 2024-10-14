import { NextFunction, Request, Response } from "express";

export function notFoundResponse(_req: Request, res: Response, _next: NextFunction) {
    return res.status(404).send("Sorry can't find that!");
}