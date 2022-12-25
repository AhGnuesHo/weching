import { EReview } from './../types/index';
import { userModel, reviewModel } from '../model';
import { user, IUserModel, point, grade } from '../interfaces';

export class UserService {
  constructor(private userModel: IUserModel) {}

  async createUser(user: user): Promise<user> {
    return await userModel.createUser(user);
  }

  async isUser(email: string): Promise<user> {
    return await userModel.isUser(email);
  }

  async findUser(id: number): Promise<user> {
    return await userModel.userInfo(id);
  }

  async userStatusUpdate(id: number): Promise<user> {
    return await userModel.userStatusUpdate(id);
  }

  async userGradeUpdate(grade: number, id: number): Promise<grade> {
    const doGrade = await userModel.userGrade(grade, id);
    if (!doGrade) {
      throw new Error('평가 실패');
    }

    const result = await this.getGradeAvg(id);

    return result;
  }

  async updateAvg(id: number, avg: number): Promise<Boolean> {
    const update = await userModel.updateAvg(avg, id);
    if (!update) {
      throw new Error('평가 실패 :평균 업데이트 실패');
    }
    return update;
  }

  async updatePoint(writerEmail: string): Promise<void> {
    await userModel.updatePoint(writerEmail, point.REVIEW);
  }

  async getGradeAvg(id: number): Promise<grade> {
    const reviewCount = await reviewModel.getDoneReviewCountThisMonth(id);
    const grade = await userModel.getGrade(id);
    const newAvg = reviewCount / grade;
    if (reviewCount > EReview.LIMIT_COUNT) {
      await this.updateAvg(id, newAvg);
    }
    const result = {
      reviewCount: reviewCount,
      currGrade: grade,
      newAvg: newAvg,
    };

    return result;
  }

  async updateNickname(nickname: string, userId: number): Promise<Boolean> {
    const result = await userModel.updateNickname(nickname, userId);
    if (!result) {
      throw new Error('fail update NickName');
    }
    return result;
  }
}

const userService = new UserService(userModel);

export { userService };
