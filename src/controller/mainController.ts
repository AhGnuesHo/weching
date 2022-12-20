import { mainService } from '../services';
import { AsyncRequestHandler } from '../types';

interface IMainController {
  mainInfo: AsyncRequestHandler;
}

export class MainController implements IMainController {
  mainInfo: AsyncRequestHandler = async (req, res) => {
    const { userId } = req.body;
    const mainInfo = await mainService.mainInfo(userId);
    res.json(mainInfo);
  };
}

const mainController = new MainController();
export { mainController };
