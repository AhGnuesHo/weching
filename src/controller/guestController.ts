import { userService } from '../services';
import { AsyncRequestHandler } from '../types';

interface IGuestController {
  register: AsyncRequestHandler;
}
export class GuestController implements IGuestController {
  register: AsyncRequestHandler = async (req, res) => {
    const user = await userService.createUser(req.body);
    res.json(user);
  };
}

const guestController = new GuestController();

export { guestController };
