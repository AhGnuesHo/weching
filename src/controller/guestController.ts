import { userService } from '../services';
import { AsyncRequestHandler } from '../types';
import { user } from '../services/interfaces/interface';

interface IGuestController {
  register: AsyncRequestHandler;
}

export class GuestController implements IGuestController {
  register: AsyncRequestHandler = async (req, res) => {
    const newUser: user = {
      email: req.body.email,
      nickName: req.body.nickName,
    };

    const user = await userService.createUser(newUser);
    res.json(user);
  };
}

const guestController = new GuestController();

export { guestController };
