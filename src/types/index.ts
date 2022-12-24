import { Request, Response, NextFunction } from 'express';

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export type ErrorType = 'FORBIDDEN' | 'NOTFOUND' | 'SERVERERROR' | 'BADREQUEST';

export type Constructor<T = {}> = new (...args: any[]) => T;

export enum month {
  MONTH = "(select to_date(to_char(now(), 'yyyy-mm'),'yyyy-mm'))",
}
