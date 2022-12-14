import { QueryResult } from 'pg';
import { userModel, UserModel } from '../model/userModel';
import { user } from '../services/interfaces/userInterface';
export class GuestService {
  constructor(private userModel: UserModel) {}

  async createUser(user: user): Promise<QueryResult<any>> {
    return await userModel.createUser(user);
  }

  async isUser(email: string): Promise<boolean> {
    return await userModel.isUser(email);
  }
}

const guestService = new GuestService(userModel);

export { guestService };
