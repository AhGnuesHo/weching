import { Router } from 'express';
import { postController } from '../controller';
import { checkPoint, DtoValidatorMiddleware } from '../middlewares';
import { asyncHandler } from '../utils';
import { PostDto, ReviewDto } from '../dto';
export const postRouter = Router();

postRouter.post(
  '/',
  checkPoint,
  DtoValidatorMiddleware(PostDto, true),
  asyncHandler(postController.posting)
);
postRouter.get('/list', asyncHandler(postController.getPosts));
postRouter.get(
  '/:postId',
  DtoValidatorMiddleware(PostDto, true),
  asyncHandler(postController.getPost)
);
