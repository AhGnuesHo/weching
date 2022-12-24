import { postService } from '../services/postService';
import { AsyncRequestHandler } from '../types';
interface IPostController {
  posting: AsyncRequestHandler;
  getPosts: AsyncRequestHandler;
}
export class PostController implements IPostController {
  posting: AsyncRequestHandler = async (req, res) => {
    const user = await postService.posting(req.body);
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
