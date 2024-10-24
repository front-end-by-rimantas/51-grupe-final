import { connection } from '../db.js';

export async function logoutGetAPI(req, res) {
    const cookie = [
        'loginToken=' + req.cookie.loginToken,
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
            status: 'success',
            msg: 'Ok',
        });
}