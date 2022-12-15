import { postService } from '../services/postService';

import { AsyncRequestHandler } from '../types';
import { post } from '../services/interfaces/interface';

interface postControllerInterface {
  post: AsyncRequestHandler;
}

export const postController: postControllerInterface = {
  async post(req: any, res: any): Promise<any> {
    const { userId, content } = req.body;
    const post: post = {
      userId: userId,
      content: content,
    };

    const user = await postService.post(post);
    res.json(user);
  },
};
