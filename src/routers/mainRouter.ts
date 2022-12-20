import { Router } from 'express';
import { asyncHandler } from '../utils';
import { mainController } from '../controller';

export const mainRouter = Router();

mainRouter.get('/', asyncHandler(mainController.mainInfo));
