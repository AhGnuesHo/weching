import { QueryResult } from 'pg';
import { userModel, UserModel } from '../model/userModel';
import { user } from './interfaces/interface';
export class GuestService {
  /// UserModel을  인터페이스로 지정해주기
  // 다형성 
  
  constructor(private userModel: UserModel) {}

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

const guestService = new GuestService(userModel);

export { guestService };
