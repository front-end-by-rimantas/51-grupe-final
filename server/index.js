import express from 'express';
import cors from 'cors';
import { homePage } from './lib/homePage.js';
import { notFoundResponse } from './middleware/notFoundResponse.js';
import { fatalServerErrorResponse } from './middleware/fatalServerErrorResponse.js';
import { notFoundPage } from './lib/notFoundPage.js';
import { registerPostAPI } from './api/registerAPI.js';
import { loginGetAPI, loginPostAPI } from './api/loginAPI.js';
import { cookieParser } from './middleware/cookieParser.js';
import { logoutGetAPI } from './api/logoutAPI.js';
import { postGetAPI, postPostAPI } from './api/postAPI.js';
import { getUserData } from './middleware/getUserData.js';
import { authorizedAccessOnly } from './middleware/authorizedAccessOnly.js';
import { notLoggedInAccessOnly } from './middleware/notLoggedInAccessOnly.js';
import { uploadApiRouter } from './api/uploadAPI.js';

const app = express();
const port = 5114;

app.use(express.json({
    type: 'application/json',
}));
app.use(express.urlencoded({
    extended: true,
}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.static('./public'));
app.use(cookieParser);
app.use(getUserData);

app.get('/', homePage);

// NEIDOMU KAS TU
app.post('/api/register', notLoggedInAccessOnly, registerPostAPI);
app.post('/api/login', notLoggedInAccessOnly, loginPostAPI);

// REIKIA ZINOTI KAS TU
app.get('/api/login', authorizedAccessOnly, loginGetAPI);
app.get('/api/logout', authorizedAccessOnly, logoutGetAPI);
app.post('/api/post', authorizedAccessOnly, postPostAPI);
app.get('/api/post', authorizedAccessOnly, postGetAPI);
app.get('/api/post/initial', authorizedAccessOnly, postGetAPI);
app.get('/api/post/new/:newerId', authorizedAccessOnly, postGetAPI);
app.get('/api/post/old/:olderId', authorizedAccessOnly, postGetAPI);
// app.put('/api/post', authorizedAccessOnly, postPutAPI);
// app.delete('/api/post', authorizedAccessOnly, postDeleteAPI);

app.use('/api/upload', authorizedAccessOnly, uploadApiRouter);

app.get('*', notFoundPage);

app.use(notFoundResponse);
app.use(fatalServerErrorResponse);

app.listen(port, () => {
    console.log('SERVER: http://localhost:' + port);
});
