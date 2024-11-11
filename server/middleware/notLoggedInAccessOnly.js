import { API_RESPONSE_STATUS } from "../lib/enum.js";

export function notLoggedInAccessOnly(req, res, next) {
    if (req.user.isLoggedIn) {
        return res.json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'API pasiekiamas tik neprisijungusiems vartotojams',
        });
    }

    next();
}