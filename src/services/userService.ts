import { QueryResult } from 'pg';
import { userModel } from '../model/userModel';
import { user, IUserModel } from './interfaces/interface';
export class UserService {
  constructor(private userModel: IUserModel) {}

  async createUser(user: user): Promise<QueryResult<any>> {
    const isUser = await this.isUser(user.email);
    if (isUser) {
      throw new Error(`User ${user.email} already exists`);
    }
    return await userModel.createUser(user);
  }

  async isUser(email: string): Promise<QueryResult<any>> {
    return await userModel.isUser(email);
  }
}

const userService = new UserService(userModel);

export { userService };
