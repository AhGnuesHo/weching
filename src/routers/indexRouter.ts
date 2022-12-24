import { Request, Response, NextFunction } from 'express';

export const indexRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.redirect('/api/main/guest');
};
