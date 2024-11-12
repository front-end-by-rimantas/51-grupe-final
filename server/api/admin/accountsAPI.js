import { connection } from "../../db.js";
import { API_RESPONSE_STATUS, ROLE } from "../../lib/enum.js";

export async function accountsGetAPI(req, res) {
    try {
        const sql = `
            SELECT users.id as id, role, email, username, profile_image, registered_at
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
            SELECT users.id as id, role, email, username, profile_image, registered_at
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE role = ?;`;
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
            SELECT users.id as id, role, email, username, profile_image, registered_at
            FROM users
            INNER JOIN roles
                ON roles.id = users.role_id
            WHERE role = ?;`;
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
            SELECT users.id as id, role, email, username, profile_image, registered_at
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