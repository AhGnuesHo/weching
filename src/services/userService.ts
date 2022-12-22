import { userModel, reviewModel } from '../model';
import { user, IUserModel, point } from '../interfaces';
import { log } from '../logger';
export class UserService {
  constructor(private userModel: IUserModel) {}

  async createUser(user: user): Promise<user> {
    return await userModel.createUser(user);
  }

  async isUser(email: string): Promise<user> {
    return await userModel.isUser(email);
  }

  async findUser(id: number): Promise<user[]> {
    return await userModel.findUser(id);
  }

  async userStatusUpdate(id: number): Promise<user[]> {
    return await userModel.userStatusUpdate(id);
  }

  async userGradeUpdate(grade: number, id: number): Promise<Boolean> {
    const doGrade = await userModel.userGrade(grade, id);
    if (!doGrade) {
      log.error('평가 실패');
      throw new Error('평가 실패');
    }
    const isDone = await reviewModel.isDone(id);
    if (!isDone) {
      log.error('평가 실패 : 평가 미완료');
      throw new Error('평가 실패 : 평가 미완료');
    }

    const avg = await this.getGradeAvg(id);
    await this.updateAvg(id, avg);

    return true;
  }
  async updateAvg(id: number, avg: number): Promise<boolean> {
    const update = await userModel.updateAvg(avg, id);
    if (!update) {
      log.error('평가 실패 : 평균 업데이트 실패');
      throw new Error('평가 실패 :평균 업데이트 실패');
    }
    return true;
  }

  async updatePoint(writerEmail: string): Promise<void> {
    await userModel.updatePoint(writerEmail, point.REVIEW);
  }

  async getGradeAvg(id: number): Promise<number> {
    const grade = await userModel.getGrade(id);
    const reviewCount = await reviewModel.getDoneReviewCount(id);
    return reviewCount / grade;
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
