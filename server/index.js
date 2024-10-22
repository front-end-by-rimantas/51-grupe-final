import express from 'express';
import cors from 'cors';
import { homePage } from './lib/homePage.js';
import { notFoundResponse } from './middleware/notFoundResponse.js';
import { fatalServerErrorResponse } from './middleware/fatalServerErrorResponse.js';
import { notFoundPage } from './lib/notFoundPage.js';
import { registerPostAPI } from './api/registerAPI.js';
import { loginPostAPI } from './api/loginAPI.js';

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
}));

app.use(express.static('./public'));

app.get('/', homePage);

app.post('/api/register', registerPostAPI);
app.post('/api/login', loginPostAPI);
// app.get('/api/logout', logoutGetAPI);
// app.get('/api/post', postGetAPI);
// app.post('/api/post', postPostAPI);
// app.put('/api/post', postPutAPI);
// app.delete('/api/post', postDeleteAPI);

app.get('*', notFoundPage);

app.use(notFoundResponse);
app.use(fatalServerErrorResponse);

app.listen(port, () => {
    console.log('SERVER: http://localhost:' + port);
});