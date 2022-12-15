import { postModel } from '../model/postModel';
import { post, IPostModel, newPost, review } from './interfaces/interface';

export class PostService {
  constructor(private postModel: IPostModel) {}

  async post(post: post): Promise<newPost> {
    const result = await postModel.post(post);
    const postId = result.id;
    await this.createReview(postId);
    return result;
  }

  async createReview(postId: number): Promise<void> {
    const count = await postModel.getAllUsersCount();
    const target = [];
    for (let i = 0; i < 3; i++) {
      target.push(Math.floor(Math.random() * (count - 15) + 15));
    }

    await postModel.createReview(target, postId);
  }

  async getPost(postId: number, userId: number): Promise<review> {
    return await postModel.getPost(postId, userId);
  }
}

const postService = new PostService(postModel);

export { postService };
