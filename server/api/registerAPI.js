import { IsValid } from '../lib/IsValid.js';
import { connection } from '../db.js';

export async function registerPostAPI(req, res) {
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

    try {
        const sql = `INSERT INTO users (email, password) VALUES (?, ?);`;
        const insertResult = await connection.execute(sql, [email, password]);

        if (insertResult[0].affectedRows !== 1) {
            return res.status(500).json({
                status: 'error',
                msg: 'Nepavyko sukurti paskyros',
            });
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

    return res.status(200).json({
        status: 'success',
        msg: 'Ok',
    });
}