import { AsyncRequestHandler } from './../types/index';
import { postModel, reviewModel } from '../model/index';
import {
  post,
  IPostModel,
  newPost,
  review,
  postWithReview,
} from '../interfaces';

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

  async getPost(postInfo: newPost): Promise<postWithReview> {
    const { id, userId } = postInfo;
    const post = await postModel.getPost(id as number, userId);
    const review = await reviewModel.getReviewByPost(id as number);
    const result = {
      post: post,
      reviews: review,
    };
    return result;
  }

  async getPosts(userId: number): Promise<newPost[]> {
    return await postModel.getPosts(userId);
  }
}

const postService = new PostService(postModel);

export { postService };
