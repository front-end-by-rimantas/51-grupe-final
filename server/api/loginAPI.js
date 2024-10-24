import { IsValid } from '../lib/IsValid.js';
import { connection } from '../db.js';
import { randomString } from '../lib/randomString.js';

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
    if (!req.cookie.loginToken) {
        return res.json({
            status: 'error',
            isLoggedIn: false,
            role: 'public',
        });
    }

    console.log(process.env.COOKIE_SIZE);


    // TODO: paimti is env.js
    if (typeof req.cookie.loginToken !== 'string'
        || req.cookie.loginToken.length !== +process.env.COOKIE_SIZE) {
        return res.json({
            status: 'error',
            isLoggedIn: false,
            role: 'public',
        });
    }

    return res.json({
        status: 'success',
        isLoggedIn: true,
        role: 'user',
        email: '',
        registeredAt: '',
    });
}