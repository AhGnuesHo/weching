import { ReviewEntity } from './reviewDto';
import { isNumber, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { newPost, postStatus, postWithReview } from '../interfaces';
import 'reflect-metadata';
export class PostDto implements newPost {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  public id: number;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  public userId: number;

  @Expose()
  @IsString()
  public content: string;

  @Expose()
  public status?: postStatus;

  @Expose()
  paramToNumber(param: string): number {
    return parseInt(param);
  }
}

export class PostEntity implements newPost {
  @IsNumber()
  @Type(() => Number)
  public id: number;

  @Expose({ name: 'user_id' })
  @Expose()
  @IsNumber()
  @Type(() => Number)
  public userId: number;

  @Expose()
  @IsString()
  public content: string;

  @Expose()
  public status?: postStatus;

  @Expose({ name: 'reviews' })
  public reviews: ReviewEntity[];

  @Expose({ name: 'is_checked' })
  public isChecked: number;
}
