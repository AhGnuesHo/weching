import { Router } from 'express';
import { adviceController } from '../controller';
import { asyncHandler } from '../utils';

export const adviceRouter = Router();

adviceRouter.get('/', asyncHandler(adviceController.getAdvice));
