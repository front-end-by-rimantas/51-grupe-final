import { connection } from "../db.js";
import { API_RESPONSE_STATUS } from "../lib/enum.js";
import { IsValid } from "../lib/IsValid.js";

export async function postReactionPostAPI(req, res) {
    const requiredFields = [
        { field: 'postId', validation: IsValid.id },
        { field: 'reactionTypeId', validation: IsValid.id },
    ];

    const [isErr, errMessage] = IsValid.requiredFields(req.body, requiredFields);
    if (isErr) {
        return res.status(400).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: errMessage,
        });
    }

    const { postId, reactionTypeId } = req.body;
    let preReaction = [];

    try {
        const sql = 'SELECT * FROM post_reactions WHERE post_id = ? AND user_id = ?;';
        const selectResult = await connection.execute(sql, [postId, req.user.id]);
        preReaction = selectResult[0][0];
    } catch (error) {
        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Serverio klaida. Nepavyko uzskaityti palaikinimo. Pabandykite veliau',
        });
    }

    let successfullyChanged = false;
    if (!preReaction) {
        successfullyChanged = await addPostReaction(req.user.id, postId, reactionTypeId);
    } else if (preReaction.reaction_type_id === reactionTypeId) {
        successfullyChanged = await deletePostReaction(postId, reactionTypeId, preReaction.id);
    } else {
        successfullyChanged = await updatePostReaction(postId, reactionTypeId, preReaction.id, preReaction.reaction_type_id);
    }

    if (!successfullyChanged) {
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

async function addPostReaction(userId, postId, reactionTypeId) {
    try {
        const sql = `INSERT INTO post_reactions (post_id, user_id, reaction_type_id) VALUES (?, ?, ?);`;
        const insertResult = await connection.execute(sql, [postId, userId, reactionTypeId]);

        if (insertResult[0].affectedRows !== 1) {
            return false;
        }
    } catch (error) {
        return false;
    }

    try {
        let column = 'likes_count';
        if (reactionTypeId === 2) {
            column = 'dislike_count';
        }
        if (reactionTypeId === 3) {
            column = 'love_count';
        }

        const sql = `UPDATE posts SET ${column} = ${column} + 1 WHERE id = ?;`;
        const [updateResult] = await connection.execute(sql, [postId]);

        if (updateResult.affectedRows !== 1) {
            return false;
        }
    } catch (error) {
        return false;
    }

    return true;
}

async function deletePostReaction(postId, reactionTypeId, prereactionTypeId) {
    try {
        const sql = 'DELETE FROM post_reactions WHERE id = ?;';
        const [result] = await connection.execute(sql, [prereactionTypeId]);

        if (result.affectedRows !== 1) {
            return false;
        }
    } catch (error) {
        return false;
    }

    try {
        let column = 'likes_count';
        if (reactionTypeId === 2) {
            column = 'dislike_count';
        }
        if (reactionTypeId === 3) {
            column = 'love_count';
        }

        const sql = `UPDATE posts SET ${column} = ${column} - 1 WHERE id = ?;`;
        const [updateResult] = await connection.execute(sql, [postId]);

        if (updateResult.affectedRows !== 1) {
            return false;
        }
    } catch (error) {
        return false;
    }

    return true;
}

async function updatePostReaction(postId, reactionTypeId, preReactionId, preReactionTypeId) {
    try {
        const sql = 'UPDATE post_reactions SET reaction_type_id = ? WHERE id = ?;';
        const [result] = await connection.execute(sql, [reactionTypeId, preReactionId]);

        if (result.affectedRows !== 1) {
            return false;
        }
    } catch (error) {
        console.log(error);

        return false;
    }

    try {
        let column = '';
        if (preReactionTypeId === 1) {
            column = 'likes_count';
        }
        if (preReactionTypeId === 2) {
            column = 'dislike_count';
        }
        if (preReactionTypeId === 3) {
            column = 'love_count';
        }

        const sql = `UPDATE posts SET ${column} = ${column} - 1 WHERE id = ?;`;
        const [updateResult] = await connection.execute(sql, [postId]);

        if (updateResult.affectedRows !== 1) {
            return false;
        }
    } catch (error) {
        return false;
    }

    try {
        let column = '';
        if (reactionTypeId === 1) {
            column = 'likes_count';
        }
        if (reactionTypeId === 2) {
            column = 'dislike_count';
        }
        if (reactionTypeId === 3) {
            column = 'love_count';
        }

        const sql = `UPDATE posts SET ${column} = ${column} + 1 WHERE id = ?;`;
        const [updateResult] = await connection.execute(sql, [postId]);

        if (updateResult.affectedRows !== 1) {
            return false;
        }
    } catch (error) {
        return false;
    }

    return true;
}