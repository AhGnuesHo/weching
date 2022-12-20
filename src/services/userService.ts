import { userModel } from '../model/userModel';
import { user, IUserModel } from '../interfaces';
export class UserService {
  constructor(private userModel: IUserModel) {}

  async createUser(user: user): Promise<user> {
    return await userModel.createUser(user);
  }

  async isUser(email: string): Promise<user> {
    return await userModel.isUser(email);
  }

  async findUser(id: number): Promise<user[]> {
    return await userModel.findUser(id);
  }

  async userStatusUpdate(id: number): Promise<user[]> {
    return await userModel.userStatusUpdate(id);
  }

  async updateNickname(nickname: string, userId: number): Promise<Boolean> {
    const result = await userModel.updateNickname(nickname, userId);
    if (!result) {
      throw new Error('fail update NickName');
    }
    return result;
  }
}

const userService = new UserService(userModel);

export { userService };
