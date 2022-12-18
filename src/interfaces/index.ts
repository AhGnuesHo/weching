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

// 질문 ) 인터페이스가 값과 행위가 분리되어 사용하고 있음
// 위의 인터페이스들은 값만 정의되어있음 거의 타입처럼 사용하는 중이고
// 아래의  IModel 인터페이스들은 행위 (주로 디비에서 데이터를 가져오는 행위)들로 정의 되어있음
// 이렇게 분리가 되어도 되는게 맞는지... ?

interface IReviewModel {
  todoReview(userId: number): Promise<newPost[]>;
  writeReview(review: review): Promise<Boolean>;
  getReviewByPost(postId: number): Promise<review[]>;
}
interface IUserModel {
  createUser(user: user): Promise<user>;
  isUser(info: any): Promise<user>;
  isNickName(nickName: string): Promise<Boolean>;
  updatePoint(info: any, deduct: number): Promise<void>;
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
