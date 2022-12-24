import { mainModel } from './../model/mainModel';
import { Main } from '../model/mainModel';
import { main } from '../interfaces';

export class MainService {
  constructor(private mainModel: Main) {}

  async mainInfo(id: number): Promise<any> {
    const main = await mainModel.mainInfo(id);
    return main.format();
  }
}

const mainService = new MainService(mainModel);

export { mainService };
