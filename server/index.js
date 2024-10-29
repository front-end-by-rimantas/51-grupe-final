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
import { postPostAPI } from './api/postAPI.js';
import { getUserData } from './middleware/getUserData.js';

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

app.use((req, res, next) => {
    console.log(req.user);

    next();
});

app.get('/', homePage);

// NEIDOMU KAS TU
app.post('/api/register', registerPostAPI);
app.post('/api/login', loginPostAPI);

// REIKIA ZINOTI KAS TU
app.get('/api/login', loginGetAPI);
app.get('/api/logout', logoutGetAPI);
app.post('/api/post', postPostAPI);
// app.get('/api/post', postGetAPI);
// app.put('/api/post', postPutAPI);
// app.delete('/api/post', postDeleteAPI);


app.get('*', notFoundPage);

app.use(notFoundResponse);
app.use(fatalServerErrorResponse);

app.listen(port, () => {
    console.log('SERVER: http://localhost:' + port);
});
