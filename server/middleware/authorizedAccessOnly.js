import { API_RESPONSE_STATUS, ROLE } from "../lib/enum.js";

export function authorizedAccessOnly(req, res, next) {
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