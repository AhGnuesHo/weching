import { adviceService } from '../services';
import { AsyncRequestHandler } from '../types';

interface adviceControllerInterface {
  getAdvice: AsyncRequestHandler;
}

export const adviceController: adviceControllerInterface = {
  async getAdvice(req: any, res: any): Promise<any> {
    const advice = await adviceService.getAdvice();

    res.json(advice);
  },
};
