import { user } from '../interfaces';

import { Expose, Exclude } from 'class-transformer';
import { IsEmail, MaxLength } from 'class-validator';

export class UserDto implements user {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @MaxLength(12)
  nickName: string;

  @Expose()
  point: number;

  @Expose()
  status: number;
}
