import { IsValid } from '../lib/IsValid.js';
import { connection } from '../db.js';
import { randomString } from '../lib/randomString.js';
import { COOKIE_ALLOWED_SYMBOLS, COOKIE_MAX_AGE, COOKIE_SIZE } from '../env.js';

export async function loginPostAPI(req, res) {
    const requiredFields = [
        { field: 'email', validation: IsValid.email },
        { field: 'password', validation: IsValid.password },
    ];

    const [isErr, errMessage] = IsValid.requiredFields(req.body, requiredFields);
    if (isErr) {
        return res.status(400).json({
            status: 'error',
            msg: errMessage,
        });
    }

    const { email, password } = req.body;
    let user = null;

    try {
        const sql = `SELECT * FROM users WHERE email = ? AND password = ?;`;
        const selectResult = await connection.execute(sql, [email, password]);

        if (selectResult[0].length !== 1) {
            return res.status(400).json({
                status: 'error',
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
            status: 'error',
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
                status: 'error',
                msg: 'Nepavyko prisijungti',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
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
            status: 'success',
            msg: 'Ok',
            role: 'user',
            email: user.email,
            registeredAt: user.registered_at,
        });
}

export async function loginGetAPI(req, res) {
    const { loginToken } = req.cookie;

    // 1) ar turim loginToken
    if (!loginToken) {
        return res.status(400).json({
            status: 'error',
            msg: 'Error: truksta loginToken rakto',
            isLoggedIn: false,
            role: 'public',
        });
    }

    // 2) ar loginToken string ir tinkamo ilgio
    if (typeof loginToken !== 'string'
        || loginToken.length !== COOKIE_SIZE) {
        return res.status(400).json({
            status: 'error',
            msg: `Error: loginToken raktas turi buti string ir ${COOKIE_SIZE} ilgio`,
            isLoggedIn: false,
            role: 'public',
        });
    }

    // 3) ar loginToken is leisinu simboliu
    for (const s of loginToken) {
        if (!COOKIE_ALLOWED_SYMBOLS.includes(s)) {
            return res.status(400).json({
                status: 'error',
                msg: `Error: loginToken turi neleistina simboli "${s}"`,
                isLoggedIn: false,
                role: 'public',
            });
        }
    }

    // 4) ar turim loginToken savo duombazeje
    let tokenObj = null;

    try {
        const sql = `
            SELECT token, email, registered_at, created_at
            FROM tokens
            INNER JOIN users
                ON users.id = tokens.user_id
            WHERE token = ?;`;
        const selectResult = await connection.execute(sql, [loginToken]);

        if (selectResult[0].length === 0) {
            return res.status(400).json({
                status: 'error',
                msg: `Error: nepavyko atpazinti vartotojo sesijos`,
                isLoggedIn: false,
                role: 'public',
            });
        }

        if (selectResult[0].length > 1) {
            return res.status(500).json({
                status: 'error',
                msg: `Serverio klaida. Nepavyko atpazinti vartotojo sesijos`,
                isLoggedIn: false,
                role: 'public',
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
                    status: 'error',
                    msg: 'LOL',
                    isLoggedIn: false,
                    role: 'public',
                });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: `Serverio klaida. Nepavyko atpazinti vartotojo sesijos`,
            isLoggedIn: false,
            role: 'public',
        });
    }

    // 5) ar loginToken vis dar galiojantis
    return res.status(200).json({
        status: 'success',
        isLoggedIn: true,
        role: 'user',
        email: tokenObj.email,
        registeredAt: tokenObj.registered_at,
    });
}