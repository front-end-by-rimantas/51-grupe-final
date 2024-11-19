import { connection } from '../db.js';
import { API_RESPONSE_STATUS } from '../lib/enum.js';
import { IsValid } from '../lib/IsValid.js';

export async function postPostAPI(req, res) {
    const requiredFields = [
        { field: 'text', validation: IsValid.postMessage },
    ];

    const [isErr, errMessage] = IsValid.requiredFields(req.body, requiredFields);
    if (isErr) {
        return res.status(400).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: errMessage,
        });
    }

    const { text } = req.body;

    try {
        const sql = 'INSERT INTO posts (text, user_id) VALUES (?, ?);';
        const insertResult = await connection.execute(sql, [text, req.user.id]);

        if (insertResult[0].affectedRows !== 1) {
            return res.status(500).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'Serverio klaida. Nepavyko irasyti zinutes. Pabandykite veliau',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Serverio klaida. Nepavyko irasyti zinutes. Pabandykite veliau',
        });
    }

    return res
        .status(201)
        .json({
            status: API_RESPONSE_STATUS.SUCCESS,
            msg: 'Ok',
        });
}

export async function postGetAPI(req, res) {
    const sqlParams = [req.user.id];
    let sqlFilter = '';

    if (req.params.newerId) {
        sqlFilter = 'WHERE posts.id > ?';
        sqlParams.push(req.params.newerId);
    }

    if (req.params.olderId) {
        sqlFilter = 'WHERE posts.id < ?';
        sqlParams.push(req.params.olderId);
    }

    const sql = `
        SELECT 
            posts.id as post_id,
            posts.text,
            posts.created_at,
            posts.likes_count,
            users.id as user_id,
            users.username,
            users.profile_image,
            (SELECT count(*) % 2 FROM post_likes WHERE post_id = posts.id AND user_id = ?) as do_i_like
        FROM posts 
        INNER JOIN users
            ON posts.user_id = users.id
        ${sqlFilter}
        ORDER BY posts.id DESC 
        LIMIT 5;`;

    try {
        const selectResult = await connection.execute(sql, sqlParams);

        return res
            .status(200)
            .json({
                status: API_RESPONSE_STATUS.SUCCESS,
                msg: 'Ok',
                posts: selectResult[0],
            });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Serverio klaida. Nepavyko gauti zinuciu. Pabandykite veliau',
        });
    }
}