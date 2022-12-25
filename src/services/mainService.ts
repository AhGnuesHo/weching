import { mainModel } from './../model/mainModel';
import { Main } from '../model/mainModel';
import { main } from '../interfaces';

export class MainService {
  constructor(private mainModel: Main) {}

  async mainInfo(): Promise<main> {
    const main = await mainModel.mainInfo();
    return main.format();
  }

  async userMainInfo(id: number): Promise<any> {
    return await mainModel.userMainInfo(id);
  }
}

const mainService = new MainService(mainModel);

export { mainService };
