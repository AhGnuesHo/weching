import { Request, Response, NextFunction } from 'express';
import path from 'path';

export const indexRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
};
