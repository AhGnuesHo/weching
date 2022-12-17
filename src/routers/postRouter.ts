import { Router } from 'express';
import { postController } from '../controller';
import { asyncHandler } from '../utils';

export const postRouter = Router();

postRouter.post('/', asyncHandler(postController.posting));
postRouter.get('/:postId', asyncHandler(postController.getPost));
postRouter.get('/', asyncHandler(postController.getPosts));
