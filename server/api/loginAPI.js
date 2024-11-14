import { IsValid } from '../lib/IsValid.js';
import { connection } from '../db.js';
import { randomString } from '../lib/randomString.js';
import { COOKIE_ALLOWED_SYMBOLS, COOKIE_MAX_AGE, COOKIE_SIZE } from '../env.js';
import { API_RESPONSE_STATUS, ROLE } from '../lib/enum.js';
import { hash } from '../lib/hash.js';

export async function loginPostAPI(req, res) {
    const requiredFields = [
        { field: 'email', validation: IsValid.email },
        { field: 'password', validation: IsValid.password },
    ];

    const [isErr, errMessage] = IsValid.requiredFields(req.body, requiredFields);
    if (isErr) {
        return res.status(400).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: errMessage,
        });
    }

    const { email, password } = req.body;
    let user = null;

    try {
        const sql = `
            SELECT users.id as id, role, username, email, profile_image, registered_at
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE email = ? AND password_hash = ?;`;
        const selectResult = await connection.execute(sql, [email, hash(password)]);

        if (selectResult[0].length !== 1) {
            return res.status(400).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'Prisijungti nepavyko, nes nesutampa email ir password pora.',
            });
        } else {
            user = selectResult[0][0];
        }
    } catch (error) {
        const errCodes = {
            ER_DUP_ENTRY: 'Toks email jau panaudotas',
        };
        const msg = errCodes[error.code] ?? 'Registracija nepavyko del serverio klaidos. Pabandykite veliau';

        return res.status(errCodes[error.code] ? 400 : 500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg,
        });
    }

    // TODO: paimti is env.js
    const token = randomString(+process.env.COOKIE_SIZE);

    try {
        const sql = 'INSERT INTO tokens (user_id, token) VALUES (?, ?);';
        const insertResult = await connection.execute(sql, [user.id, token]);

        if (insertResult[0].affectedRows !== 1) {
            return res.status(500).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'Nepavyko prisijungti',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Nepavyko prisijungti',
        });
    }

    /** Laikas sekundemis */
    const maxAge = 15 * 60;
    const cookie = [
        'loginToken=' + token,
        'domain=localhost',
        'path=/',
        'max-age=' + maxAge,
        'SameSite=Lax',
        // 'Secure',
        'HttpOnly',
    ];

    return res
        .status(200)
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: API_RESPONSE_STATUS.SUCCESS,
            msg: 'Ok',
            id: user.id,
            role: user.role,
            username: user.username,
            email: user.email,
            profileImage: user.profile_image,
            registeredAt: user.registered_at,
        });
}

export async function loginGetAPI(req, res) {
    const { loginToken } = req.cookie;

    // 1) ar turim loginToken
    if (!loginToken) {
        return res.status(400).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Error: truksta loginToken rakto',
            isLoggedIn: false,
            role: ROLE.PUBLIC,
        });
    }

    // 2) ar loginToken string ir tinkamo ilgio
    if (typeof loginToken !== 'string'
        || loginToken.length !== COOKIE_SIZE) {
        return res.status(400).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: `Error: loginToken raktas turi buti string ir ${COOKIE_SIZE} ilgio`,
            isLoggedIn: false,
            role: ROLE.PUBLIC,
        });
    }

    // 3) ar loginToken is leisinu simboliu
    for (const s of loginToken) {
        if (!COOKIE_ALLOWED_SYMBOLS.includes(s)) {
            return res.status(400).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: `Error: loginToken turi neleistina simboli "${s}"`,
                isLoggedIn: false,
                role: ROLE.PUBLIC,
            });
        }
    }

    // 4) ar turim loginToken savo duombazeje
    let tokenObj = null;

    try {
        const sql = `
            SELECT user_id, role, username, token, email, profile_image, registered_at, created_at
            FROM tokens
            INNER JOIN users
                ON users.id = tokens.user_id
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE token = ?;`;
        const selectResult = await connection.execute(sql, [loginToken]);

        if (selectResult[0].length === 0) {
            return res.status(400).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: `Error: nepavyko atpazinti vartotojo sesijos`,
                isLoggedIn: false,
                role: ROLE.PUBLIC,
            });
        }

        if (selectResult[0].length > 1) {
            return res.status(500).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: `Serverio klaida. Nepavyko atpazinti vartotojo sesijos`,
                isLoggedIn: false,
                role: ROLE.PUBLIC,
            });
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

    // 5) ar loginToken vis dar galiojantis
    return res.status(200).json({
        status: API_RESPONSE_STATUS.SUCCESS,
        isLoggedIn: true,
        role: tokenObj.role,
        id: tokenObj.user_id,
        username: tokenObj.username,
        email: tokenObj.email,
        profileImage: tokenObj.profile_image,
        registeredAt: tokenObj.registered_at,
    });
}
