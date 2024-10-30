export function notLoggedInAccessOnly(req, res, next) {
    if (req.user.isLoggedIn) {
        return res.json({
            status: 'error',
            msg: 'API pasiekiamas tik neprisijungusiems vartotojams',
        });
    }

    next();
}