import { IsValid } from '../lib/IsValid.js';
import { connection } from '../db.js';
import { API_RESPONSE_STATUS } from '../lib/enum.js';

export async function registerPostAPI(req, res) {
    const requiredFields = [
        { field: 'username', validation: IsValid.username },
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

    const { username, email, password } = req.body;

    try {
        const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`;
        const insertResult = await connection.execute(sql, [username, email, password]);

        if (insertResult[0].affectedRows !== 1) {
            return res.status(500).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'Nepavyko sukurti paskyros',
            });
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

    return res.status(201).json({
        status: API_RESPONSE_STATUS.SUCCESS,
        msg: 'Ok',
    });
}