import { newReview } from '../interfaces';
import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import { IsString, Max } from 'class-validator';
import { PostEntity } from './postDto';

export class ReviewDto implements newReview {
  @Type(() => Number)
  @Expose()
  id: number;

  @Type(() => Number)
  postId: number;

  @Type(() => Number)
  userId: number;

  @Expose()
  @IsString()
  content: string;

  @Type(() => Number)
  @Expose()
  grade: number;
}

export class ReviewEntity {
  @Type(() => Number)
  @Expose()
  id: number;

  @Type(() => PostEntity)
  @Expose({ name: 'post_id' })
  postId: PostEntity;

  @Type(() => Number)
  @Expose({ name: 'user_id' })
  userId: number;

  @Expose()
  @IsString()
  content: string;

  @Type(() => Number)
  @Expose()
  grade: number;
}
