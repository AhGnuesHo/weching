import { userService } from '../services';
import { AsyncRequestHandler } from '../types';
import { user, newReview } from '../interfaces';
import { Review } from './reviewController';
import { log } from '../logger';
import { parentPort } from 'worker_threads';

interface userControllerInterface {
  findUser: AsyncRequestHandler;
  deleteUser: AsyncRequestHandler;
  updateUserGrade: AsyncRequestHandler;
  updateNickname: AsyncRequestHandler;
}

export class User implements user {
  email: string;
  nickName: string;
  point: number;
  status: number;
  constructor(email: string, nickName: string, point: number, status: number) {
    this.email = email;
    this.nickName = nickName;
    this.point = point;
    this.status = status;
  }
}

export const userController: userControllerInterface = {
  async findUser(req: any, res: any, next: any): Promise<any> {
    const id = req.body.userId;
    const status = req.body.status;

    if (status !== 0) {
      throw new Error('가입된 회원이 없습니다.');
    }
    const findUser = await userService.findUser(id);

    res.json(findUser);
  },

  async deleteUser(req: any, res: any, next: any): Promise<any> {
    const id = req.body.userId;
    const update = await userService.userStatusUpdate(id);
    res.json(update);
  },

  async updateUserGrade(req: any, res: any, next: any): Promise<any> {
    const id = req.params.reviewId;
    const userId = parseInt(id);
    const { grade } = req.body;
    const userGrade = parseInt(grade);
    const result = await userService.userGradeUpdate(userGrade, userId);

    res.json(result);
  },

  async updateNickname(req, res) {
    const { nickName } = req.body;
    const { userId } = req.body;
    const update = await userService.updateNickname(nickName, userId);
    res.json(update);
  },
};
