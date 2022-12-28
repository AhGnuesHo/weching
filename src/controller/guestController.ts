import { userService } from "../services";
import { AsyncRequestHandler } from "../types";
import { setUserToken } from "../utils/jwt";

interface IGuestController {
  register: AsyncRequestHandler;
  login: AsyncRequestHandler;
}
export class GuestController implements IGuestController {
  register: AsyncRequestHandler = async (req, res) => {
    const user = await userService.createUser(req.body);
    res.json(user);
  };
  login: AsyncRequestHandler = async (req, res) => {
    const exUser = await userService.isUser(req.body.email);
    if (exUser) {
      res.json(setUserToken(res, exUser));
    } else {
      res.json({ email: req.body.email });
    }
  };
}

const guestController = new GuestController();

export { guestController };
