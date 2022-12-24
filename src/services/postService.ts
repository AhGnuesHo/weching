import { plainToInstance } from 'class-transformer';
import { postModel, reviewModel } from '../model/index';
import {
  post,
  IPostModel,
  newPost,
  postWithReview,
  newPostAndTargetReview,
} from '../interfaces';
import { PostDto } from '../dto';

export class PostService {
  constructor(private postModel: IPostModel) {}

  async posting(post: post): Promise<newPostAndTargetReview> {
    return await postModel.postingAndMatchingReview(post);
  }

  async createReview(userId: number): Promise<number[]> {
    const targetUserCount = 3;
    const count = await postModel.getAllUsersCount();
    let target = [];
    // 여기 좀 별로인것 같은데 고쳐보겠습니다.
    for (let i = 0; i < targetUserCount; i++) {
      const random = Math.floor(Math.random() * (count - 15)) + 15;
      if (target.indexOf(random) === -1 && target.indexOf(userId) == -1) {
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
      posts.map(async (post) => {
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

  async getPost(userId: number, postId: number): Promise<newPost> {
    return await postModel.getPost(userId, postId);
  }
}

const postService = new PostService(postModel);

export { postService };
