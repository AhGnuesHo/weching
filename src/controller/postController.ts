import { postService } from '../services/postService';
import { Request } from 'express';
import { AsyncRequestHandler } from '../types';
import { post, RequestBody } from '../services/interfaces/interface';

interface RequestParams {
  postId: number;
}

interface postControllerInterface {
  post: AsyncRequestHandler<Request>;
  getPost: AsyncRequestHandler<Request<RequestParams, RequestBody>>;
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
    const postId = req.params.postId;
    const { userId } = req.body;
    const myPost = await postService.getPost(postId, userId);
    return res.json(myPost);
  },
};
