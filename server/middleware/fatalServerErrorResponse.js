export function fatalServerErrorResponse(err, _req, res, _next) {
    console.error(err.stack);
    return res.status(500).send('Something broke!');
}