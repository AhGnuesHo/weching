import { Router } from 'express';
import { postController } from '../controller';
import { checkPoint, DtoValidatorMiddleware } from '../middlewares';
import { asyncHandler } from '../utils';
import { PostDto, ReviewDto } from '../dto';
export const postRouter = Router();

postRouter.post('/', checkPoint, asyncHandler(postController.posting));
postRouter.get('/:postId', asyncHandler(postController.getPost));
postRouter.get('/list', asyncHandler(postController.getPosts));
