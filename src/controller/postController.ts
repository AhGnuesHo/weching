import { postService } from '../services/postService';
import { AsyncRequestHandler } from '../types';
import { newPost, post, postStatus } from '../services/interfaces/interface';
import { plainToClass } from 'class-transformer';
import { request } from 'http';

interface IPostController {
  posting: AsyncRequestHandler;
  getPost: AsyncRequestHandler;
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
// todo 게시글 목록 조회

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
