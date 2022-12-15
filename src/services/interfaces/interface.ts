import { LargeNumberLike } from 'crypto';
import { QueryResult } from 'pg';

interface user {
  email: string;
  nickName: string;
  birthday: Date;
  point?: number;
}

interface post {
  userId: BigInt;
  content: string;
  status?: postStatus;
}

interface newPost extends post {
  id: number;
}

interface review extends newPost {
  content: string;
}
enum postStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
}

enum userEnum {
  USER = 'user',
  GUEST = 'guest',
}
interface IReviewModel {
  getReview(userId: number): Promise<newPost[]>;
}
interface IUserModel {
  createUser(user: user): Promise<QueryResult<any>>;
  isUser(email: string): Promise<QueryResult<any>>;
}

interface IPostModel {
  post(post: post): Promise<newPost>;
  getAllUsersCount(): Promise<number>;
  createReview(targetUser: number[], postId: number): Promise<void>;
}

export {
  user,
  post,
  postStatus,
  userEnum,
  IUserModel,
  IPostModel,
  newPost,
  IReviewModel,
};
