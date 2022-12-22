import { postModel, reviewModel } from '../model/index';
import { post, IPostModel, newPost, postWithReview } from '../interfaces';
import { reviewService } from './reviewService';

export class PostService {
  constructor(private postModel: IPostModel) {}

  async posting(post: post): Promise<newPost> {
    const result = await postModel.posting(post);
    const postId = result.id;
    await this.createReview(postId as number);
    return result;
  }

  async createReview(postId: number): Promise<void> {
    const targetUserCount = 3;
    const count = await postModel.getAllUsersCount();
    let target = [18, 999, 3];
    // for (let i = 0; i < targetUserCount; i++) {
    //   target.push(Math.floor(Math.random() * (count - 15)) + 15);
    // }
    // todo api array로 변경

    // 총합이랑, 평균 낸거 같이 보내기
    // 등수랑 

    await postModel.createReview(target, postId);
  }

  async getPosts(userId: number): Promise<postWithReview[]> {
    const posts = await postModel.getPosts(userId);
    const result = await Promise.all(
      posts.map(async (post) => {
        const { id } = post;
        const review = await reviewModel.getReviewByPost(id as number);
        const result = {
          post: post,
          reviews: review,
        };
        return result;
      })
    );
    return result;
  }
}

const postService = new PostService(postModel);

export { postService };
