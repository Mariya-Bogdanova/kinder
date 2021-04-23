import express from 'express';
import path from 'path';
import methodOverride from 'method-override';
import '../db/db.js';
import kinderRouter from './routes/kinderRouter.js';
import anaimalCardRouter from './routes/anaimalCardRouter.js';
import notFoundMiddleware from '../middlewares/notfound.js';
import errorMiddleware from '../middlewares/error.js';

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/animal', anaimalCardRouter);
app.use('/', kinderRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(process.env.PORT ?? 3000);
