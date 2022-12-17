import { adviceService } from '../services';
import { AsyncRequestHandler } from '../types';

interface adviceControllerInterface {
  getAdvice: AsyncRequestHandler;
}

export const adviceController: adviceControllerInterface = {
  async getAdvice(req: any, res: any): Promise<any> {
    const advice = await adviceService.getAdvice();
    const max: number = advice.length;
    const random: number = Math.floor(Math.random() * max);
    res.json(advice[random]);
  },
};
