import { Router } from 'express';
import { asyncHandler } from '../utils';
import { userController } from '../controller/userController';

export const userRouter = Router();

userRouter.get('/', asyncHandler(userController.findUser));
