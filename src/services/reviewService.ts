import { PostEntity } from './../dto/postDto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ReviewDto, ReviewEntity } from './../dto/reviewDto';
import { reviewModel } from '../model/reviewModel';
import {
  IReviewModel,
  newPost,
  point,
  review,
  grade,
  newReview,
} from '../interfaces';
import { userModel } from '../model';
import { log } from '../logger';
import { userService } from './userService';

export class ReviewService {
  constructor(private reviewModel: IReviewModel) {}

  async getReview(userId: number): Promise<PostEntity[]> {
    const todoReview = await reviewModel.todoReview(userId);
    if (!todoReview) {
      throw new Error(`유저를 찾을 수 없음 : 유저 아이디  ${userId}`);
    }
    return plainToInstance(PostEntity, todoReview);
  }

  async writeReview(review: ReviewDto): Promise<review> {
    const myTodo = await this.getReview(review.userId);

    const isMyTodo = myTodo.find((todo) => todo.id === review.postId);
    if (!isMyTodo) {
      throw new Error('배정되지 않은 게시글에는 칭찬을 할 수 없습니다.');
    }
    const result = await reviewModel.writeReview(review);
    if (!result) {
      throw new Error(`이미 칭찬 한 게시글 입니다 ${JSON.stringify(review)}`);
    }

    const { userId } = review;
    await userModel.updatePoint(userId, point.REVIEW);

    return review;
  }

  async gradeReview(
    grade: number,
    reviewId: number,
    userId: number
  ): Promise<grade> {
    const myPost = await reviewModel.getPostInfoByReviewId(reviewId);
    const myPostEntity = plainToInstance(PostEntity, myPost);

    if (userId !== myPostEntity.userId) {
      throw new Error('본인의 게시글에만 평가를 남길 수 있습니다.');
    }

    const isDone = await reviewModel.isDone(reviewId);
    if (!isDone) {
      throw new Error('평가 실패 : 이미 평가를 끝낸 리뷰입니다');
    }

    return await userService.userGradeUpdate(grade, reviewId);
  }

  async reviewBookmark(id: number): Promise<Boolean> {
    const bookmark = await reviewModel.reviewBookmark(id);
    return bookmark;
  }

  async bookmark(id: number): Promise<newReview[]> {
    return await reviewModel.bookmark(id);
  }
}

const reviewService = new ReviewService(reviewModel);

export { reviewService };
