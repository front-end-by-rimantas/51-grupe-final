/**
 * 
 * @param {Request} _req 
 * @param {Response} res 
 * @returns 
 */
export function notFoundPage(_req, res) {
    return res.status(404).send('404 PAGE - content not found');
}