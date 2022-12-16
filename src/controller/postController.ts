import { postService } from '../services/postService';

import { AsyncRequestHandler } from '../types';
import { post } from '../services/interfaces/interface';

interface postControllerInterface {
  post: AsyncRequestHandler;
  getPost: AsyncRequestHandler;
}

export const postController: postControllerInterface = {
  async post(req, res) {
    const { userId, content } = req.body;
    const post: post = {
      userId: userId,
      content: content,
    };

    const user = await postService.post(post);
    res.json(user);
  },

  async getPost(req, res) {
    const postId = parseInt(req.params.postId);
    const { userId } = req.body;
    const myPost = await postService.getPost(postId, userId);

    return res.json(myPost);
  },
};
