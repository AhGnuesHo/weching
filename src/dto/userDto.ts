import { user } from '../interfaces';
import { Expose, Type } from 'class-transformer';
import { IsEmail, MaxLength } from 'class-validator';

export class UserDto implements user {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @MaxLength(12)
  nickName: string;

  @Expose()
  status: number;

  @Expose()
  @Type(() => Number)
  point: number;
}
