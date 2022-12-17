import { QueryResult } from 'pg';
import { userModel } from '../model/userModel';
import { user, IUserModel } from './interfaces/interface';
export class UserService {
  //// 닉네임 중복확인
  constructor(private userModel: IUserModel) {}

  async createUser(user: user): Promise<user> {
    const isUser = await this.isUser(user.email);
    if (isUser) {
      throw new Error(`User ${user.email} already exists`);
    }
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
}

const userService = new UserService(userModel);

export { userService };
