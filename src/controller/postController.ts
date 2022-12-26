import { postService } from '../services/postService';
import { AsyncRequestHandler } from '../types';
interface IPostController {
  posting: AsyncRequestHandler;
  getPosts: AsyncRequestHandler;
  getPost: AsyncRequestHandler;
}
export class PostController implements IPostController {
  posting: AsyncRequestHandler = async (req, res) => {
    const user = await postService.posting(req.body);
    res.json(user);
  };

  getPosts: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const myAllPost = await postService.getPosts(userId);
    res.json(myAllPost);
  };

  getPost: AsyncRequestHandler = async (req, res) => {
    const { userId, postId } = req.body;
    const post = await postService.getPost(userId, postId);
    res.json(post);
  };
}

const postController = new PostController();
export { postController };
