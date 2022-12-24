import { user } from '../interfaces';

import { Expose } from 'class-transformer';

export class User implements user {
  email: string;
  nickName: string;
  point: number;
  status: number;
  constructor(email: string, nickName: string, point: number, status: number) {
    this.email = email;
    this.nickName = nickName;
    this.point = point;
    this.status = status;
  }
}
