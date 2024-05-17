import express, { Express, Request, Response } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import booksRouter from './routes/books.route';
import { PORT, HOST, API_VERSION } from './config';

const app: Express = express();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: `${API_VERSION}`,
      description: 'API to manage Library',
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
      },
    ]
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
