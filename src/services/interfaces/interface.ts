import { LargeNumberLike } from 'crypto';
import { QueryResult } from 'pg';

interface user {
  email: string;
  nickName: string;
  point?: number;
  status?: number;
}

interface post {
  userId: BigInt;
  content: string;
  status?: postStatus;
}

interface notice {
  title: string;
  content: string;
}

interface advice {
  author: string;
  authorrofile: string;
  message: string;
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

interface INoticeModel {
  createNotice(notice: notice): Promise<notice[]>;
  findNotice(id: number): Promise<notice[]>;
  findAll(start: number): Promise<notice[]>;
  update(id: number, notice: notice): Promise<notice[]>;
  delete(id: number): Promise<notice[]>;
}

interface IAdviceModel {
  getAdvice(): Promise<advice[]>;
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
  advice,
  IAdviceModel,
  notice,
  INoticeModel,
};
