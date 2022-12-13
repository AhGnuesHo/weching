import { guestService } from './../services/guestService';

import { AsyncRequestHandler } from '../types';
import { userType } from '../services/interfaces/userInterface';

interface guestControllerInterface {
  register: AsyncRequestHandler;
}

export const guestController: guestControllerInterface = {
  async register(req: any, res: any): Promise<any> {
    const newUser: userType = {
      email: req.body.email,
      password: req.body.password,
      ranking: 0,
      point: 0,
    };

    await guestService.createUser(newUser);
  },
};
