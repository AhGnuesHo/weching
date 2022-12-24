import { Router } from 'express';
import { asyncHandler } from '../utils';
import { userController } from '../controller/userController';
import { checkName, expireUser } from '../middlewares';

export const userRouter = Router();

userRouter.get('/', expireUser, asyncHandler(userController.findUser));
userRouter.delete('/', asyncHandler(userController.deleteUser));
userRouter.post('/checkName', checkName);
userRouter.patch(
  '/',
  expireUser,
  checkName,
  asyncHandler(userController.updateNickname)
);
