import { PostDto } from "./dto/postDto";
import { UserDto } from "./dto/userDto";
import { rankModel } from "./model/rankModel";
import express from "express";
import cors from "cors";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import logger from "morgan";
import { log } from "./logger";
import { port, user, host, database, password, postgresPort } from "./config";
import {
  checkEmail,
  DtoValidatorMiddleware,
  errorHandler,
  checkName,
  updateHandler,
  loginRequired,
} from "./middlewares";
import {
  indexRouter,
  guestRouter,
  mainRouter,
  authRouter,
  loginRouter,
  postRouter,
  noticeRouter,
  reviewRouter,
  adviceRouter,
  reportRouter,
} from "./routers";
import { endPoint } from "./constants";
import { Pool } from "pg";
import { userRouter } from "./routers/userRouter";
import { ReviewDto } from "./dto";
import path from "path";

export const app = express();

export const pg = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: postgresPort,
});

pg.connect()
  .then(() => log.info(`database Connect`))
  .catch((err) => log.error("connection error", err.stack));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require("./passport")();

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/favicon.ico", (req, res) => res.status(204));
app.get(endPoint.index, indexRouter);
app.use("/api/login", loginRouter);
app.use(endPoint.main, mainRouter);
app.use(endPoint.auth, authRouter);
app.use(
  endPoint.guest,
  DtoValidatorMiddleware(UserDto, true),
  checkEmail,
  checkName,
  updateHandler,
  guestRouter
);
app.use(endPoint.post, loginRequired, postRouter);
app.use(
  endPoint.review,
  loginRequired,
  DtoValidatorMiddleware(ReviewDto, true),
  reviewRouter
);
app.use(endPoint.notice, noticeRouter);
app.use(endPoint.advice, adviceRouter);
app.use(
  endPoint.user,
  loginRequired,
  DtoValidatorMiddleware(UserDto, true),
  userRouter
);
app.use(endPoint.report, reportRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

app.listen(port, () => {
  log.info(`Server listening on port: ${port}`);
});

// 스케줄러는 어느 계층에 있어야하는지 고민해봤는데
// 어느 곳에 있어도 다 이상한 것 같습니다.
// 정답을.. 알려주세요ㅜ
cron.schedule(
  "* * 1-12 * *",
  async () => {
    log.info(`update ranking`);
    try {
      await rankModel.setNewRank();
      await rankModel.resetRank();
    } catch (e) {
      log.error(e);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Seoul",
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build"));
});
