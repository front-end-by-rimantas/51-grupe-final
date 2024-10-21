import { IsValid } from '../lib/IsValid.js';

export function registerPostAPI(req, res) {
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

    return res.json({
        status: 'success',
        msg: 'Ok',
    });
}