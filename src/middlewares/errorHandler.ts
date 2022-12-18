import { ErrorRequestHandler } from 'express';
import { errorResponse } from '../utils';
import { log } from '../logger';
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  log.error(err.stack);
  errorResponse(res, 'BADREQUEST', err.message);
};
