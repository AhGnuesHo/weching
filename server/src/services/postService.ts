import { QueryResult } from 'pg';
import { postModel, PostModel } from '../model/postModel';
import { post } from './interfaces/interface';

export class PostService {
  constructor(private postModel: PostModel) {}

  async post(post: post): Promise<QueryResult<any>> {
    return await postModel.post(post);
  }
}

const postService = new PostService(postModel);

export { postService };
