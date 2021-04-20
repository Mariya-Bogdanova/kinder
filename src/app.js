import express from 'express';
import path from 'path';
import '../db/db.js';
import kinderRouter from './routes/kinderRouter.js';
import notFoundMiddleware from '../middlewares/notfound.js';
import errorMiddleware from '../middlewares/error.js';

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use('/', kinderRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(process.env.PORT ?? 3000);
