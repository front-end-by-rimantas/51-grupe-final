/**
 * 
 * @param {Error} err 
 * @param {Request} _req 
 * @param {Response} res 
 * @param {NextFunction} _next 
 * @returns 
 */
export function fatalServerErrorResponse(err, _req, res, _next) {
    console.error(err.stack);
    return res.status(500).send('Something broke!');
}