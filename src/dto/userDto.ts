import { user } from "../interfaces";
import { Expose, Type, Exclude } from "class-transformer";
import { IsEmail, MaxLength } from "class-validator";
import "reflect-metadata";
import { type } from "os";

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

export class UserEntity {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose({ name: "nickname" })
  @MaxLength(12)
  nickName: string;

  @Expose()
  status: number;

  @Expose()
  @Type(() => Number)
  point: number;

  @Expose({ name: "post_count" })
  @Type(() => Number)
  postCount: number;

  @Expose({ name: "review_count" })
  @Type(() => Number)
  reviewCount: number;

  @Expose()
  @Type(() => Number)
  rankgrade: number;
}
