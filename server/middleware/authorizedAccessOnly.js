import { API_RESPONSE_STATUS, ROLE } from "../lib/enum.js";

export function usersOnly(req, res, next) {
    if (!req.user.isLoggedIn) {
        return res.json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'API pasiekiamas tik prisijungusiems vartotojams',
            isLoggedIn: false,
            role: ROLE.PUBLIC,
        });
    }

    next();
}

export function adminsOnly(req, res, next) {
    if (!req.user.isLoggedIn || req.user.role !== ROLE.ADMIN) {
        if (Math.random() >= 0.5) {
            return res.status(404).send('404 PAGE - content not found');
        } else {
            return res.json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'API pasiekiamas tik prisijungusiems administratoriams',
                isLoggedIn: false,
                role: ROLE.PUBLIC,
            });
        }
    }

    next();
}