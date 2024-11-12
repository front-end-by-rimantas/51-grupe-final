import { connection } from "../db.js";
import { COOKIE_ALLOWED_SYMBOLS, COOKIE_MAX_AGE, COOKIE_SIZE } from "../env.js";
import { API_RESPONSE_STATUS, ROLE } from "../lib/enum.js";

export async function getUserData(req, res, next) {
    req.user = {
        isLoggedIn: false,
        role: ROLE.PUBLIC,
        email: '',
        id: -1,
        registeredAt: -1,
    };

    const { loginToken } = req.cookie;

    if (typeof loginToken !== 'string'
        || loginToken.length !== COOKIE_SIZE
    ) {
        return next();
    }

    for (const s of loginToken) {
        if (!COOKIE_ALLOWED_SYMBOLS.includes(s)) {
            return next();
        }
    }

    let tokenObj = null;

    try {
        const sql = `
            SELECT user_id, role, token, email, registered_at, created_at
            FROM tokens
            INNER JOIN users
                ON users.id = tokens.user_id
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE token = ?;`;
        const selectResult = await connection.execute(sql, [loginToken]);

        if (selectResult[0].length === 0) {
            return next();
        }

        if (selectResult[0].length > 1) {
            return next();
        }

        tokenObj = selectResult[0][0];

        if (tokenObj.created_at.getTime() + COOKIE_MAX_AGE * 1000 < Date.now()) {
            const cookie = [
                'loginToken=' + loginToken,
                'domain=localhost',
                'path=/',
                'max-age=-1',
                'SameSite=Lax',
                // 'Secure',
                'HttpOnly',
            ];

            return res
                .status(200)
                .set('Set-Cookie', cookie.join('; '))
                .json({
                    status: API_RESPONSE_STATUS.ERROR,
                    msg: 'LOL',
                    isLoggedIn: false,
                    role: ROLE.PUBLIC,
                });
        }
    } catch (error) {
        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: `Serverio klaida. Nepavyko atpazinti vartotojo sesijos`,
            isLoggedIn: false,
            role: ROLE.PUBLIC,
        });
    }

    req.user = {
        isLoggedIn: true,
        role: tokenObj.role,
        id: tokenObj.user_id,
        email: tokenObj.email,
        registeredAt: tokenObj.registered_at,
    };

    next();
}