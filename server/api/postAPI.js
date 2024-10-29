import { connection } from '../db.js';
import { IsValid } from '../lib/IsValid.js';

export async function postPostAPI(req, res) {
    // 1) pagal cookie susirasti vartotojo ID

    const requiredFields = [
        { field: 'text', validation: IsValid.postMessage },
    ];

    const [isErr, errMessage] = IsValid.requiredFields(req.body, requiredFields);
    if (isErr) {
        return res.status(400).json({
            status: 'error',
            msg: errMessage,
        });
    }

    // 4) irasyti post'a i DB

    return res
        .status(201)
        .json({
            status: 'success',
            msg: 'Ok',
        });
}