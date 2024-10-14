import express from 'express';
import { homePage } from './lib/homePage.js';
import { notFoundResponse } from './middleware/notFoundResponse.js';
import { fatalServerErrorResponse } from './middleware/fatalServerErrorResponse.js';
import { notFoundPage } from './lib/notFoundPage.js';

const app = express();
const port = 5114;

app.get('/', homePage as any);
app.get('*', notFoundPage as any);

app.use(notFoundResponse as any);
app.use(fatalServerErrorResponse as any);

app.listen(port, () => {
    console.log('SERVER: http://localhost:' + port);
});