import { QueryResult } from 'pg';

interface user {
  email: string;
  nickName: string;
  point?: number;
  status?: number;
}

interface post {
  userId: number;
  content?: string;
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
  id: number | string;
}

interface review {
  postId: number | string;
  userId: number;
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
  writeReview(
    userId: number,
    postId: number,
    content: string
  ): Promise<newPost>;
}
interface IUserModel {
  createUser(user: user): Promise<user>;
  isUser(email: string): Promise<user>;
}

interface IPostModel {
  posting(post: post): Promise<newPost>;
  getAllUsersCount(): Promise<number>;
  createReview(targetUser: number[], postId: number): Promise<void>;
  getPost(postId: number, userId: number): Promise<review>;
  getPosts(userId: number): Promise<newPost[]>;
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
  review,
  IReviewModel,
  advice,
  IAdviceModel,
  notice,
  INoticeModel,
};
