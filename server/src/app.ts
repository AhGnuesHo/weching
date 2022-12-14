import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';

import logger from 'morgan';

import { port, user, host, database, password, postgresPort } from './config';
import { errorHandler, loginRequired } from './middlewares';
import { indexRouter, guestRouter, authRouter } from './routers';
import { endPoint } from './constants';
import { Pool } from 'pg';
import { noticeRouter } from './routers/noticeRouter';
require('./passport')();
const app = express();

export const pg = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: postgresPort,
});

pg.connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get(endPoint.index, indexRouter);
app.use(endPoint.guest, guestRouter);
app.use(endPoint.notice, noticeRouter);
app.use(endPoint.user, loginRequired);
app.use('/auth', authRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
