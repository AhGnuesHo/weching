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

interface newPost extends post {
  id: number | string;
}

interface review {
  // postId : Review 클래스에서 생성자로 string받음 , req.params...
  // 그래서 string 도 써버린..
  postId: number | string;
  userId: number;
  content: string;
}

interface postWithReview {
  post: newPost;
  reviews: review[];
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
interface IReviewModel {
  todoReview(userId: number): Promise<newPost[]>;
  writeReview(review: review): Promise<Boolean>;
  getReviewByPost(postId: number): Promise<review[]>;
}
interface IUserModel {
  createUser(user: user): Promise<user>;
  isUser(email: string): Promise<user>;
  isNickName(nickName: string): Promise<Boolean>;
  updatePoint(email: string, deduct: number): Promise<void>;
}

interface IPostModel {
  posting(post: post): Promise<newPost>;
  getAllUsersCount(): Promise<number>;
  createReview(targetUser: number[], postId: number): Promise<void>;
  getPost(postId: number, userId: number): Promise<newPost>;
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
  point,
  INoticeModel,
  postWithReview,
};
