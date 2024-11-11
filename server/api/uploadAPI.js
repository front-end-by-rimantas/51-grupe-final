import express from 'express';
import multer from 'multer';
import { connection } from '../db.js';
import { API_RESPONSE_STATUS } from '../lib/enum.js';

export const uploadApiRouter = express.Router();

uploadApiRouter.post('/', (req, res) => {
    return res
        .status(404)
        .json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Netikslus API adresas',
        });
});

/*************************/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/users');
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').at(-1);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile' + '-' + uniqueSuffix + '.' + extension);
    }
});

const uploadProfileImage = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
});

uploadApiRouter.post('/profile', uploadProfileImage.single('user_profile_image'), async (req, res) => {
    const filePath = 'http://localhost:5114/img/users/' + req.file.filename;

    try {
        const sql = 'UPDATE users SET profile_image = ? WHERE id = ?;';
        const updateResult = await connection.execute(sql, [filePath, req.user.id]);

        if (updateResult[0].affectedRows !== 1 || updateResult[0].changedRows !== 1) {
            return res
                .status(500)
                .json({
                    status: API_RESPONSE_STATUS.ERROR,
                    msg: 'Nepavyko issaugoti norimos nuotraukos',
                });
        }
    } catch (error) {
        return res
            .status(500)
            .json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'Nepavyko issaugoti norimos nuotraukos',
            });
    }

    return res
        .status(201)
        .json({
            status: API_RESPONSE_STATUS.SUCCESS,
            msg: 'Failas ikeltas',
            path: filePath,
        });
});
