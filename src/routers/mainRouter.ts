import { Router } from 'express';
import { asyncHandler } from '../utils';
import { mainController } from '../controller';
import { loginRequired } from '../middlewares';

export const mainRouter = Router();

mainRouter.get('/', loginRequired, asyncHandler(mainController.mainInfo));
mainRouter.get('/guest', asyncHandler(mainController.mainInfo));
