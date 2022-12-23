import { PoolClient } from 'pg';
import { QueryResult } from 'pg';
interface user {
  email: string;
  nickName: string;
  point?: number;
  status?: number;
  grade?: number;
}

interface grade {
  reviewCount: number;
  currGrade: number;
  newAvg: number;
}

interface post {
  userId: number;
  content?: string;
  status?: postStatus;
}

interface newPost extends post {
  id: number | string;
}

interface review {
  postId: number | string;
  userId: number;
  content?: string;
}

interface newReview extends review {
  id: number | string;
}

interface postWithReview {
  post: newPost;
  reviews: review[];
}
interface notice {
  title?: string;
  content?: string;
}

interface newNotice extends notice {
  id: number | string;
}

interface advice {
  author: string;
  authorrofile: string;
  message: string;
}
interface main {
  user: user;
  todoReview: newPost[];
  advice: advice;
  post: postWithReview[];
}

enum postStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
}

enum userEnum {
  USER = 'user',
  GUEST = 'guest',
}

enum point {
  POST = -3,
  REVIEW = 5,
}

interface rank {
  id: number;
  avg: number;
}

interface IReviewModel {
  todoReview(userId: number): Promise<newPost[]>;
  writeReview(review: review): Promise<Boolean>;
  getReviewByPost(postId: number): Promise<review[]>;
  getDoneReviewCount(userId: number): Promise<number>;
  isDone(id: number, userId: number): Promise<Boolean>;
  getReviewWriter(Id: number): Promise<user>;
}

interface report {
  type?: string;
  typeId?: number;
  content?: string;
}

interface newReport extends report {
  reviewId: number | string;
}

interface pageNationReport {
  totalPage: number;
  currPage: number;
  report?: newReport[];
  reportType?: newReport[];
}

interface newPostAndTargetReview {
  post: newPost;
  target: number[];
}

interface IUserModel {
  createUser(user: user): Promise<user>;
  userInfo(id: number): Promise<user>;
  isUser(info: any): Promise<user>;
  isNickName(nickName: string): Promise<Boolean>;
  updatePoint(info: any, deduct: number): Promise<void>;
  getAllUsersCounts(): Promise<QueryResult<any>>;
  userStatusUpdate(id: number): Promise<user>;
  getGrade(id: number): Promise<number>;
  updateAvg(id: number, avg: number): Promise<Boolean>;
  updateNickname(nickName: string, userId: number): Promise<Boolean>;
}

interface IPostModel {
  posting(post: post, pool: PoolClient): Promise<newPost>;
  getAllUsersCount(): Promise<number>;
  createReview(targetUser: number[], postId: number): Promise<void>;
  getPosts(userId: number): Promise<newPost[]>;
}
interface INoticeModel {
  createNotice(notice: notice): Promise<notice[]>;
  findNotice(noticeInfo: newNotice): Promise<newNotice[]>;
  findAll(page: number): Promise<notice[]>;
  update(noticeInfo: newNotice, notice: notice): Promise<notice[]>;
  delete(noticeDetailId: newNotice): Promise<notice[]>;
}

interface IReportModel {
  createReport(
    type: string,
    type_id: newReport,
    content: string
  ): Promise<report>;
  findAll(page: number): Promise<newReport[]>;
  findType(type: string, page: number): Promise<newReport[]>;
  countAll(): Promise<number>;
  countType(type: string): Promise<number>;
}
interface IAdviceModel {
  getAdvice(): Promise<advice>;
}
interface IRankModel {
  getRank(): Promise<rank[]>;
  setNewRank(): Promise<void>;
}
interface pageNationNotice {
  totalPage: number;
  currPage: number;
  notice: newNotice[];
}
export {
  user,
  post,
  postStatus,
  userEnum,
  IUserModel,
  IPostModel,
  newPost,
  main,
  review,
  IReviewModel,
  advice,
  IAdviceModel,
  notice,
  newNotice,
  point,
  INoticeModel,
  postWithReview,
  rank,
  IRankModel,
  IReportModel,
  pageNationNotice,
  grade,
  report,
  newReview,
  newReport,
  pageNationReport,
  newPostAndTargetReview,
};
