import { Request, Response } from "express";

export function notFoundPage(_req: Request, res: Response) {
    return res.status(404).send('404 PAGE - content not found');
}