import { Request, Response } from "express";

export function homePage(_req: Request, res: Response) {
    return res.send('HOME PAGE');
}