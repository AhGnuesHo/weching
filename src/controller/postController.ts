import { postService } from '../services/postService';
import { AsyncRequestHandler } from '../types';
import { newPost, post, postStatus } from '../interfaces';
import { plainToClass } from 'class-transformer';

interface IPostController {
  posting: AsyncRequestHandler;
  // getPost: AsyncRequestHandler;
  getPosts: AsyncRequestHandler;
}

export class Post implements newPost {
  id: string;
  userId: number;
  content: string;
  status?: postStatus;
  constructor(
    id: string,
    userId: number,
    content: string,
    status?: postStatus
  ) {
    this.id = id;
    this.userId = userId;
    this.content = content;
    this.status = status;
  }
  get strToNumber(): number {
    const id = parseInt(this.id, 10);
    return id;
  }
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
