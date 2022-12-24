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
export class UserController implements userControllerInterface {
  findUser: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const findUser = await userService.findUser(userId);
    res.json(findUser);
  };
  deleteUser: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const update = await userService.userStatusUpdate(userId);
    res.json(update);
  };
  updateNickname: AsyncRequestHandler = async (req, res) => {
    const { nickName, userId } = req.body;
    const update = await userService.updateNickname(nickName, userId);
    res.json(update);
  };
}

const userController = new UserController();
export { userController };
