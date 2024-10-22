import { IsValid } from '../lib/IsValid.js';
import { connection } from '../db.js';

export async function loginPostAPI(req, res) {
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
        const sql = `SELECT * FROM users WHERE email = ? AND password = ?;`;
        const selectResult = await connection.execute(sql, [email, password]);

        if (selectResult[0].length !== 1) {
            return res.json({
                status: 'error',
                msg: 'Prisijungti nepavyko, nes nesutampa email ir password pora.',
            });
        }
    } catch (error) {
        const errCodes = {
            ER_DUP_ENTRY: 'Toks email jau panaudotas',
        };
        const msg = errCodes[error.code] ?? 'Registracija nepavyko del serverio klaidos. Pabandykite veliau';

        return res.json({
            status: 'error',
            msg,
        });
    }

    return res.json({
        status: 'success',
        msg: 'Ok',
    });
}