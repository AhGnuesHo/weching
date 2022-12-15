import { Request, Response, NextFunction } from 'express';
import { AsyncRequestHandler } from '../types';

export const asyncHandler = <T>(
  asyncHandlerArgFunc: AsyncRequestHandler<T>
) => {
  return async (req: T, res: Response, next: NextFunction) => {
    try {
      await asyncHandlerArgFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
