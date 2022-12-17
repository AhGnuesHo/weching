import { AsyncRequestHandler } from './../types/index';
import { postModel } from '../model/postModel';
import { post, IPostModel, newPost, review } from './interfaces/interface';

export class PostService {
  constructor(private postModel: IPostModel) {}

  async posting(post: post): Promise<newPost> {
    const result = await postModel.posting(post);
    const postId = result.id;
    await this.createReview(postId as number);
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

  async getPost(postInfo: newPost): Promise<review> {
    const { id, userId } = postInfo;
    return await postModel.getPost(id as number, userId);
  }

  async getPosts(userId: number): Promise<newPost[]> {
    return await postModel.getPosts(userId);
  }
}

const postService = new PostService(postModel);

export { postService };
