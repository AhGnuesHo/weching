import { ReviewEntity } from './../dto/reviewDto';
import { PostDto, PostEntity } from './../dto/postDto';
import { PoolClient } from 'pg';
import { UserEntity } from '../dto';

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
  postId: string | number;
  userId: number;
  content?: string;
  grade?: number;
}

interface newReview extends review {
  id: number | string;
}

interface postWithReview {
  post: PostEntity;
  reviews: ReviewEntity[];
}

interface mainUserInfo {
  user: UserEntity;
  todoReview: PostEntity[];
  posts: postWithReview[];
}

interface notice {
  title?: string;
  content?: string;
}

interface newNotice extends notice {
  id: number | string;
}

interface cursorPage {
  findMaxId: number;
  findAllCursor: newNotice[];
  nextCursor: string | number | null;
}

interface advice {
  author: string;
  authorrofile: string;
  message: string;
}
interface main {
  advice: advice;
  ranking: rank[];
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
  rank: number;
  id: number;
  avg: number;
}

interface IReviewModel {
  todoReview(userId: number): Promise<PostEntity[]>;
  writeReview(review: review): Promise<Boolean>;
  getReviewByPost(postId: number): Promise<ReviewEntity[]>;
  getDoneReviewCountThisMonth(userId: number): Promise<number>;
  isDone(id: number, userId: number): Promise<Boolean>;
  getReviewWriter(Id: number): Promise<user>;
  reviewBookmark(reviewId: number): Promise<Boolean>;
  bookmark(userId: number): Promise<any[]>;
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
  userInfo(id: number): Promise<UserEntity>;
  isUser(info: any): Promise<user>;
  isNickName(nickName: string): Promise<Boolean>;
  updatePoint(info: any, deduct: number): Promise<void>;
  userStatusUpdate(id: number): Promise<user>;
  getGrade(id: number): Promise<number>;
  updateAvg(id: number, avg: number): Promise<Boolean>;
  updateNickname(nickName: string, userId: number): Promise<Boolean>;
}

interface IPostModel {
  posting(post: post, pool: PoolClient): Promise<newPost>;
  getAllUsersCount(): Promise<number>;
  createReview(targetUser: number[], post: PostEntity): Promise<void>;
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
  getRank(rankPg: PoolClient): Promise<rank[]>;
  setNewRank(): Promise<void>;
  getBest(): Promise<rank[]>;
}
interface pageNationNotice {
  totalPage: number;
  currPage: number;
  notice: newNotice[];
}

interface reviewStatus {
  report: report[];
  reviewStatus: number;
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
  mainUserInfo,
  reviewStatus,
  cursorPage,
};
