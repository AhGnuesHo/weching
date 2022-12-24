import { userService } from '../services';
import { AsyncRequestHandler } from '../types';
import { user, newReview } from '../interfaces';
import { ReviewDto } from '../dto';
import { log } from '../logger';
import { parentPort } from 'worker_threads';

interface userControllerInterface {
  findUser: AsyncRequestHandler;
  deleteUser: AsyncRequestHandler;
  updateNickname: AsyncRequestHandler;
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

  async updateNickname(req, res) {
    const { nickName } = req.body;
    const { userId } = req.body;
    const update = await userService.updateNickname(nickName, userId);
    res.json(update);
  },
};
