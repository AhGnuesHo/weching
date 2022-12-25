import { Request, Response, NextFunction } from 'express';

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export type ErrorType = 'FORBIDDEN' | 'NOTFOUND' | 'SERVERERROR' | 'BADREQUEST';

export type Constructor<T = {}> = new (...args: any[]) => T;

export enum query {
  MONTH = "(select to_date(to_char(now(), 'yyyy-mm'),'yyyy-mm'))",
}

export enum EReview {
  LIMIT_COUNT = 10,
  TARGET_USER = 3,
  LIMIT_USER_NUMBER = 15,
}
