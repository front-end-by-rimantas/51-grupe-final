import express from 'express';
import { accountsAdminsGetAPI, accountsBlockedGetAPI, accountsGetAPI, accountsUsersGetAPI } from '../api/admin/accountsAPI.js';

export const adminApiRouter = express.Router();

adminApiRouter.get('/', (req, res) => {
    return res.status(404).send('Not found');
});

adminApiRouter.get('/accounts', accountsGetAPI);
adminApiRouter.get('/accounts/admins', accountsAdminsGetAPI);
adminApiRouter.get('/accounts/users', accountsUsersGetAPI);
adminApiRouter.get('/accounts/blocked', accountsBlockedGetAPI);