import { isNumber, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { newPost, postStatus } from '../interfaces';
import 'reflect-metadata';
export class PostDto implements newPost {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  public id: number;

  @Expose({ name: 'user_id' })
  @IsNumber()
  @Type(() => Number)
  public userId: number;

  @Expose()
  @IsString()
  public content: string;

  @Expose()
  public status?: postStatus;
}
