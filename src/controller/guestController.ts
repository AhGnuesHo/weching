import { userService } from '../services';
import { Request } from 'express';
import { AsyncRequestHandler } from '../types';
import { user } from '../services/interfaces/interface';

interface RequestBody {
  email: string;
  birthday: Date;
  nickname: string;
}
interface guestControllerInterface {
  register: AsyncRequestHandler<Request<RequestBody>>;
}
export const guestController: guestControllerInterface = {
  async register(req, res) {
    const newUser: user = {
      email: req.body.email,
      birthday: new Date(req.body.birthday),
      nickName: req.body.nickName,
    };

    const user = await userService.createUser(newUser);
    res.json(user);
  },
};
