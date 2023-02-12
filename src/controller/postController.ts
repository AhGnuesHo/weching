import { postService } from "../services/postService";
import { AsyncRequestHandler } from "../types";
interface IPostController {
  posting: AsyncRequestHandler;
  getPost: AsyncRequestHandler;
  getPosts: AsyncRequestHandler;
}
export class PostController implements IPostController {
  posting: AsyncRequestHandler = async (req, res) => {
    const user = await postService.posting(req.body);

    res.json(user);
  };

  getPost: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const postId = req.body.paramToNumber(req.params.postId);
    const post = await postService.getPost(userId, postId);
    res.json(post);
  };

  getPosts: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const myAllPost = await postService.getPosts(userId);
    res.json(myAllPost);
  };
}

const postController = new PostController();
export { postController };
