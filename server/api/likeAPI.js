import { connection } from "../db.js";
import { API_RESPONSE_STATUS } from "../lib/enum.js";
import { IsValid } from "../lib/IsValid.js";

export async function postLikePostAPI(req, res) {
    const requiredFields = [
        { field: 'postId', validation: IsValid.id },
    ];

    const [isErr, errMessage] = IsValid.requiredFields(req.body, requiredFields);
    if (isErr) {
        return res.status(400).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: errMessage,
        });
    }

    const { postId } = req.body;

    // Pridedam LIKE
    try {
        const sql = 'INSERT INTO post_likes (user_id, post_id) VALUES (?, ?);';
        const insertResult = await connection.execute(sql, [req.user.id, postId]);

        if (insertResult[0].affectedRows !== 1) {
            return res.status(500).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'Serverio klaida. Nepavyko uzskaityti palaikinimo. Pabandykite veliau',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Serverio klaida. Nepavyko uzskaityti palaikinimo. Pabandykite veliau',
        });
    }

    let totalLikes = 0;

    // Patikriname kiek jau yra LIKE
    try {
        const sql = 'SELECT COUNT(*) as totalLikes FROM post_likes WHERE user_id = ? AND post_id = ?;';
        const selectResult = await connection.execute(sql, [req.user.id, postId]);
        totalLikes = selectResult[0][0].totalLikes;
    } catch (error) {
        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Serverio klaida. Nepavyko uzskaityti palaikinimo. Pabandykite veliau',
        });
    }

    // Atnaujiname posto total LIKE kieki
    try {
        const diff = totalLikes % 2 === 0 ? -1 : 1;
        const sql = `UPDATE posts SET likes_count = likes_count + ? WHERE id = ?;`;
        const updateResult = await connection.execute(sql, [diff, postId]);

        if (updateResult[0].affectedRows !== 1) {
            return res.status(500).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'Serverio klaida. Nepavyko uzskaityti palaikinimo. Pabandykite veliau',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Serverio klaida. Nepavyko uzskaityti palaikinimo. Pabandykite veliau',
        });
    }

    return res
        .status(201)
        .json({
            status: API_RESPONSE_STATUS.SUCCESS,
            msg: 'Ok',
        });
}