import { postService } from '../services/postService';
import { AsyncRequestHandler } from '../types';
import { newPost, post, postStatus } from '../interfaces';
import { plainToClass } from 'class-transformer';

interface IPostController {
  posting: AsyncRequestHandler;
  getPost: AsyncRequestHandler;
  getPosts: AsyncRequestHandler;
}

export class Post implements newPost {
  id: number;
  userId: number;
  content: string;
  status?: postStatus;
  constructor(
    id: string,
    userId: number,
    content: string,
    status?: postStatus
  ) {
    this.id = parseInt(id, 10);
    this.userId = userId;
    this.content = content;
    this.status = status;
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

  getPost: AsyncRequestHandler = async (req, res) => {
    const post: newPost = {
      id: req.params.postId,
      userId: req.body.userId,
    };
    const postInfo = plainToClass(Post, post);
    const myPost = await postService.getPost(postInfo);

    return res.json(myPost);
  };

  getPosts: AsyncRequestHandler = async (req, res) => {
    const userId = req.body.userId;
    const myAllPost = await postService.getPosts(userId);
    res.json(myAllPost);
  };
}

const postController = new PostController();
export { postController };
