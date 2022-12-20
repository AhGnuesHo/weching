import { Router } from 'express';
import { postController } from '../controller';
import { checkPoint } from '../middlewares';
import { asyncHandler } from '../utils';

export const postRouter = Router();

postRouter.post('/', checkPoint, asyncHandler(postController.posting));
postRouter.get('/', asyncHandler(postController.getPosts));
