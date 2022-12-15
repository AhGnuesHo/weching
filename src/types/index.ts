import { Request, Response, NextFunction } from 'express';

export type AsyncRequestHandler<T> = (
  req: T,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export type ErrorType = 'FORBIDDEN' | 'NOTFOUND' | 'SERVERERROR' | 'BADREQUEST';
