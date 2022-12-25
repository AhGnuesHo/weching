import { Router } from 'express';
import { asyncHandler } from '../utils';
import { mainController, userController } from '../controller';
import { checkName, loginRequired } from '../middlewares';

export const mainRouter = Router();

mainRouter.get('/', asyncHandler(mainController.mainInfo));
mainRouter.get('/user', loginRequired, asyncHandler(mainController.userInfo));
mainRouter.post(
  '/checkName',
  checkName,
  asyncHandler(userController.isUsingEmail)
);
