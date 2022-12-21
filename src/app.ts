import { rankModel } from './model/rankModel';
import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import logger from 'morgan';
import { log } from './logger';
import { port, user, host, database, password, postgresPort } from './config';
import { errorHandler, loginRequired, userHandler } from './middlewares';
import {
  indexRouter,
  guestRouter,
  mainRouter,
  authRouter,
  postRouter,
  noticeRouter,
  reviewRouter,
  adviceRouter,
  reportRouter,
} from './routers';
import { endPoint } from './constants';
import { Pool } from 'pg';
import { userRouter } from './routers/userRouter';

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export const pg = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: postgresPort,
});

pg.connect()
  .then(() => log.info(`database Connect`))
  .catch((err) => log.err('connection error', err.stack));
require('./passport')();

app.get(endPoint.index, indexRouter);
// todo .get 과 .use의 차이?
app.use(endPoint.main, loginRequired, mainRouter);
app.use(endPoint.auth, authRouter);
app.use(endPoint.guest, userHandler, guestRouter);
app.use(endPoint.post, loginRequired, postRouter);
app.use(endPoint.review, loginRequired, reviewRouter);
app.use(endPoint.notice, noticeRouter);
app.use(endPoint.advice, adviceRouter);
app.use(endPoint.user, loginRequired, userRouter);
app.use(endPoint.report, reportRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

app.listen(port, () => {
  log.info(`Server listening on port: ${port}`);
});

cron.schedule(
  '* * 1-12 * *',
  async () => {
    try {
      await rankModel.getRank();
    } catch (e) {
      log.error(e);
    }
  },
  {
    scheduled: true,
    timezone: 'Asia/Seoul',
  }
);
