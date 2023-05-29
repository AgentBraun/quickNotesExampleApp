import MongoStore from 'connect-mongo';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';
import { requiresAuth } from './middleware/auth';
import adminRoutes from './routes/admin';
import notesRoutes from './routes/notes';
import userRoutes from './routes/users';
import env from './util/validateEnv';

const app = express();

app.use(morgan('dev')); //library za detektovanje requesta

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use('/api/users', userRoutes);
app.use('/api/notes', requiresAuth, notesRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'endpoint not found!s'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
