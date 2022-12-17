import { adviceModel } from '../model/adviceModel';
import { IAdviceModel, advice } from '../interfaces';

export class AdviceService {
  constructor(private adviceModel: IAdviceModel) {}

  async getAdvice(): Promise<advice[]> {
    const row = await adviceModel.getAdvice();
    return row;
  }
}

const adviceService = new AdviceService(adviceModel);

export { adviceService };
