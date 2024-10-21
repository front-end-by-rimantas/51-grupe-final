import { IsValid } from '../lib/IsValid.js';
import { connection } from '../db.js';

export async function registerPostAPI(req, res) {
    const requiredFields = [
        { field: 'email', validation: IsValid.email },
        { field: 'password', validation: IsValid.password },
    ];

    const [isErr, errMessage] = IsValid.requiredFields(req.body, requiredFields);
    if (isErr) {
        return res.json({
            status: 'error',
            msg: errMessage,
        });
    }

    const { email, password } = req.body;

    try {
        const sql = `SELECT * FROM users WHERE email = ?;`;
        const selectResult = await connection.execute(sql, [email]);

        if (selectResult[0].length > 0) {
            return res.json({
                status: 'error',
                msg: 'Toks email jau panaudotas',
            });
        }
    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Registracija nepavyko del serverio klaidos. Pabandykite veliau',
        });
    }

    return res.json({
        status: 'success',
        msg: 'Ok',
    });
}