import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils";
import { log } from "../logger";
import jwt from "jsonwebtoken";

export function loginRequired(req: Request, res: Response, next: NextFunction) {
  const userToken = req.headers.authorization?.split(" ")[1];

  if (!userToken || userToken === "null") {
    log.error("Authorization 토큰 없음");
    errorResponse(
      res,
      "FORBIDDEN",
      "로그인한 유저만 사용할 수 있는 서비스입니다."
    );

    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const userId = (<{ userId: string }>jwtDecoded).userId;
    const email = (<{ email: string }>jwtDecoded).email;
    const status = (<{ status: number }>jwtDecoded).status;
    req.body.userId = userId;
    req.body.email = email;
    req.body.status = status;

    next();
  } catch (error) {
    errorResponse(res, "FORBIDDEN", "정상적인 토큰이 아닙니다.");

    return;
  }
}

export function mainUser(req: Request, res: Response, next: NextFunction) {
  const userToken = req.headers.authorization?.split(" ")[1];

  if (!userToken || userToken === "null") {
    res.json([]);
    return;
  }

  const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
  const jwtDecoded = jwt.verify(userToken, secretKey);
  const userId = (<{ userId: string }>jwtDecoded).userId;
  const email = (<{ email: string }>jwtDecoded).email;
  const status = (<{ status: number }>jwtDecoded).status;
  req.body.userId = userId;
  req.body.email = email;
  req.body.status = status;

  next();
}
