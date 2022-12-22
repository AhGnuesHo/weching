import { Router } from 'express';
import { asyncHandler } from '../utils';
import { userController } from '../controller/userController';
import { userHandler, checkName } from '../middlewares';

export const userRouter = Router();

userRouter.get('/', asyncHandler(userController.findUser));
userRouter.delete('/', asyncHandler(userController.deleteUser));
userRouter.post('/checkName', checkName);
userRouter.patch('/', userHandler, asyncHandler(userController.updateNickname));
