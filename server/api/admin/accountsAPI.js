import { connection } from "../../db.js";
import { API_RESPONSE_STATUS, ROLE } from "../../lib/enum.js";
import { IsValid } from "../../lib/IsValid.js";

export async function accountsGetAPI(req, res) {
    try {
        const sql = `
            SELECT users.id as id, role, email, username, profile_image, registered_at, status
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id;`;
        const [selectRes] = await connection.execute(sql);

        return res.json({
            status: API_RESPONSE_STATUS.SUCCESS,
            list: selectRes,
        });
    } catch (error) {
        return res.json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'ERROR',
        });
    }
}

export async function accountsAdminsGetAPI(req, res) {
    try {
        const sql = `
            SELECT users.id as id, role, email, username, profile_image, registered_at, status
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE role = ? AND email NOT LIKE "%_deactivated";`;
        const [selectRes] = await connection.execute(sql, [ROLE.ADMIN]);

        return res.json({
            status: API_RESPONSE_STATUS.SUCCESS,
            list: selectRes,
        });
    } catch (error) {
        return res.json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'ERROR',
        });
    }
}

export async function accountsUsersGetAPI(req, res) {
    try {
        const sql = `
            SELECT users.id as id, role, email, username, profile_image, registered_at, status
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE role = ? AND email NOT LIKE "%_deactivated";`;
        const [selectRes] = await connection.execute(sql, [ROLE.USER]);

        return res.json({
            status: API_RESPONSE_STATUS.SUCCESS,
            list: selectRes,
        });
    } catch (error) {
        return res.json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'ERROR',
        });
    }
}

export async function accountsBlockedGetAPI(req, res) {
    try {
        const sql = `
            SELECT users.id as id, role, email, username, profile_image, registered_at, status
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE users.status = 3 AND email NOT LIKE "%_deactivated";`;
        const [selectRes] = await connection.execute(sql);

        return res.json({
            status: API_RESPONSE_STATUS.SUCCESS,
            list: selectRes,
        });
    } catch (error) {
        return res.json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'ERROR',
        });
    }
}

export async function accountsDeletedGetAPI(req, res) {
    try {
        const sql = `
            SELECT users.id as id, role, email, username, profile_image, registered_at, status
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE email LIKE "%_deactivated";`;
        const [selectRes] = await connection.execute(sql);

        return res.json({
            status: API_RESPONSE_STATUS.SUCCESS,
            list: selectRes,
        });
    } catch (error) {
        return res.json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'ERROR',
        });
    }
}

export async function changeAccountRolePostAPI(req, res) {
    const requiredFields = [
        { field: 'userId', validation: IsValid.id },
        { field: 'newRole', validation: IsValid.role },
    ];

    const [isErr, errMessage] = IsValid.requiredFields(req.body, requiredFields);
    if (isErr) {
        return res.status(400).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: errMessage,
        });
    }

    const { userId, newRole } = req.body;

    try {
        const sql = `
            UPDATE users
            SET role_id = (
                SELECT id FROM roles WHERE role = ?
            )
            WHERE id = ?;`;
        const [updateRes] = await connection.execute(sql, [newRole, userId]);

        if (updateRes.affectedRows !== 1) {
            return res.status(500).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'Kazkas keisto keiciant role...',
            });
        }

        return res.status(200).json({
            status: API_RESPONSE_STATUS.SUCCESS,
            msg: 'Role pakeista sekmingai',
        });
    } catch (error) {
        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Serverio klaida, bandant pakeisti role',
        });
    }
}

export async function accountDeleteAPI(req, res) {
    const userId = +req.params.userId;
    const [err, msg] = IsValid.id(userId);

    if (err) {
        return res.status(400).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: msg,
        });
    }

    try {
        const deactivation = `_${Date.now()}_deactivated`;
        const sql = `
            UPDATE users
            SET
                username = CONCAT((SELECT username FROM users WHERE id = ?), ?),
                email = CONCAT((SELECT email FROM users WHERE id = ?), ?),
                password_hash = ?
            WHERE id = ?;`;
        const [updateRes] = await connection.execute(sql, [userId, deactivation, userId, deactivation, '', userId]);

        if (updateRes.affectedRows !== 1) {
            return res.status(500).json({
                status: API_RESPONSE_STATUS.ERROR,
                msg: 'Kazkas keisto bandant istrinti paskyra',
            });
        }

        return res.status(200).json({
            status: API_RESPONSE_STATUS.SUCCESS,
            msg: 'Paskyra istrinta sekmingai',
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: API_RESPONSE_STATUS.ERROR,
            msg: 'Serverio klaida, bandant istrinti paskyra',
        });
    }
}
