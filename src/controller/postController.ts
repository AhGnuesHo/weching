import { PostDto } from './../dto/postDto';
import { postService } from '../services/postService';
import { AsyncRequestHandler } from '../types';
import { newPost, post, postStatus } from '../interfaces';
import { plainToClass } from 'class-transformer';

interface IPostController {
  posting: AsyncRequestHandler;
  getPosts: AsyncRequestHandler;
}

export class PostController implements IPostController {
  posting: AsyncRequestHandler = async (req, res) => {
    const { userId, content } = req.body;
    const post: post = {
      userId: userId,
      content: content,
    };

    const user = await postService.posting(post);
    res.json(user);
  };

  getPosts: AsyncRequestHandler = async (req, res) => {
    const userId = req.body.userId;

    const myAllPost = await postService.getPosts(userId);
    res.json(myAllPost);
  };
}

const postController = new PostController();
export { postController };
