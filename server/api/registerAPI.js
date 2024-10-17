import { IsValid } from '../lib/IsValid.js';

export function registerPostAPI(req, res) {
    const requiredFields = [
        {
            field: 'email',
            validation: IsValid.email,
        },
        {
            field: 'password',
            validation: IsValid.password,
        },
    ];

    if (Object.keys(req.body).length !== requiredFields.length) {
        return res.json({
            status: 'error',
            msg: 'Registracijai reikalingi tik email ir password',
        });
    }

    for (const { field, validation } of requiredFields) {
        const value = req.body[field];
        const [isErr, errMessage] = validation(value);

        if (isErr) {
            return res.json({
                status: 'error',
                msg: errMessage,
            });
        }
    }

    return res.json({
        status: 'success',
        msg: 'Ok',
    });
}