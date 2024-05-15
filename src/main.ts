import express, { Express, Request, Response } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import booksRouter from './routes/books';
import { PORT, HOST, API_VERSION } from './config';

const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.send(`Library API ${API_VERSION} is running`);
});

app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(PORT, HOST, () => {
  console.log(`[server]: Server is running at http://${HOST}:${PORT}`);
});