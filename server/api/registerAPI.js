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
        const sql = `INSERT INTO users (email, password) VALUES (?, ?);`;
        const insertResult = await connection.execute(sql, [email, password]);

        console.log(insertResult);

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