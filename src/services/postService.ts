import { EReview } from "./../types/index";
import { postModel, reviewModel } from "../model/index";
import {
  post,
  IPostModel,
  postWithReview,
  newPostAndTargetReview,
} from "../interfaces";
import { PostEntity } from "../dto";

export class PostService {
  constructor(private postModel: IPostModel) {}

  async posting(post: post): Promise<newPostAndTargetReview> {
    return await postModel.postingAndMatchingReview(post);
  }

  async createReview(userId: number): Promise<number[]> {
    const count = await postModel.getAllUsersCount();
    let target = [];

    for (let i = 0; i < EReview.TARGET_USER; i++) {
      const random =
        Math.floor(Math.random() * (count - EReview.LIMIT_USER_NUMBER)) +
        EReview.LIMIT_USER_NUMBER;
      if (target.indexOf(random) === -1 && target.indexOf(userId) === -1) {
        target.push(random);
      } else {
        i--;
      }
    }

    return target;
  }

  async getPosts(userId: number): Promise<postWithReview[]> {
    const posts = await postModel.getPosts(userId);

    const result = await Promise.all(
      posts.map(async (post: PostEntity) => {
        const { id } = post;
        const review = await reviewModel.getReviewByPost(id);
        const result = {
          post: post,
          reviews: review,
        };

        return result;
      })
    );

    return result;
  }

  async getPost(userId: number, postId: number): Promise<postWithReview> {
    await postModel.hasNewReview(postId, 0);
    const post = await postModel.getPost(userId, postId);
    const reviews = await reviewModel.getReviewByPost(postId);
    return { post, reviews };
  }
}

const postService = new PostService(postModel);

export { postService };
