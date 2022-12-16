import { userService } from '../services';
import { Request } from 'express';
import { AsyncRequestHandler } from '../types';
import { user } from '../services/interfaces/interface';

interface RequestBody {
  email: string;
  nickname: string;
}
interface guestControllerInterface {
  register: AsyncRequestHandler;
}
export const guestController: guestControllerInterface = {
  async register(req, res) {
    const newUser: user = {
      email: req.body.email,
      nickName: req.body.nickName,
    };

    const user = await userService.createUser(newUser);
    res.json(user);
  },
};
