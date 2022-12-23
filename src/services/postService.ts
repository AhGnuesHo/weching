import { postModel, reviewModel } from '../model/index';
import {
  post,
  IPostModel,
  newPost,
  postWithReview,
  newPostAndTargetReview,
} from '../interfaces';
import { reviewService } from './reviewService';

export class PostService {
  constructor(private postModel: IPostModel) {}

  async posting(post: post): Promise<newPostAndTargetReview> {
    const result = await postModel.postingAndMatchingReview(post);
    return result;
  }

  async createReview(): Promise<number[]> {
    const targetUserCount = 3;
    const count = await postModel.getAllUsersCount();
    let target = [];
    for (let i = 0; i < targetUserCount; i++) {
      const random = Math.floor(Math.random() * (count - 15)) + 15;
      if (target.indexOf(random) === -1) {
        target.push(random);
      } else {
        i--;
      }
    }
    // todo api array로 변경

    // 총합이랑, 평균 낸거 같이 보내기
    // 등수랑
    return target;
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
