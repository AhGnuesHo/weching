import { Router } from 'express';
import { asyncHandler } from '../utils';
import { userController } from '../controller/userController';
import { checkName, expireUser, updateHandler } from '../middlewares';

export const userRouter = Router();

userRouter.get('/', expireUser, asyncHandler(userController.findUser));
userRouter.delete('/', asyncHandler(userController.deleteUser));
userRouter.post(
  '/checkName',
  checkName,
  asyncHandler(userController.isUsingEmail)
);
userRouter.patch(
  '/',
  expireUser,
  checkName,
  updateHandler,
  asyncHandler(userController.updateNickname)
);
