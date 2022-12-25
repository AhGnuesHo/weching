import { loginRequired } from '../middlewares';
import { mainService } from '../services';
import { AsyncRequestHandler } from '../types';

interface IMainController {
  mainInfo: AsyncRequestHandler;
  userInfo: AsyncRequestHandler;
}

export class MainController implements IMainController {
  mainInfo: AsyncRequestHandler = async (req, res) => {
    const mainInfo = await mainService.mainInfo();
    res.json(mainInfo);
  };
  userInfo: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const userInfo = await mainService.userMainInfo(userId);
    res.json(userInfo);
  };
}

const mainController = new MainController();
export { mainController };
