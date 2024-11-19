import express from 'express';
import { accountDeleteAPI, accountsAdminsGetAPI, accountsBlockedGetAPI, accountsDeletedGetAPI, accountsGetAPI, accountsUsersGetAPI, changeAccountRolePostAPI } from '../api/admin/accountsAPI.js';

export const adminApiRouter = express.Router();

adminApiRouter.get('/', (req, res) => {
    return res.status(404).send('Not found');
});

adminApiRouter.get('/accounts', accountsGetAPI);
adminApiRouter.get('/accounts/admins', accountsAdminsGetAPI);
adminApiRouter.get('/accounts/users', accountsUsersGetAPI);
adminApiRouter.get('/accounts/blocked', accountsBlockedGetAPI);
adminApiRouter.get('/accounts/deleted', accountsDeletedGetAPI);

adminApiRouter.delete('/accounts/:userId', accountDeleteAPI);

adminApiRouter.put('/change-account-role', changeAccountRolePostAPI);