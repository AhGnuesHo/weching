import { userService } from '../services';

import { AsyncRequestHandler } from '../types';
import { user } from '../services/interfaces/interface';

interface userControllerInterface {
  findUser: AsyncRequestHandler;
}

export const userController: userControllerInterface = {
  async findUser(req: any, res: any): Promise<any> {
    const id = req.body.userId;
    const findUser = await userService.findUser(id);
    res.json(findUser);
  },
};
