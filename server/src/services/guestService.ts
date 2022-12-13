import { userModel, UserModel } from '../model/userModel';
import { userType } from '../services/interfaces/userInterface';
export class GuestService {
  // 의존성 주입
  constructor(private usermodel: UserModel) {}

  async createUser(userType: userType): Promise<void> {
    await userModel.createUser(userType);
  }
}

const guestService = new GuestService(userModel);

export { guestService };
