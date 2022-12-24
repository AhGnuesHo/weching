import { newReview } from '../interfaces';
import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import { IsString, Max } from 'class-validator';

export class ReviewDto implements newReview {
  @Type(() => Number)
  @Expose()
  id: number;

  @Type(() => Number)
  // @Expose({ name: 'post_id' })
  postId: string;

  @Type(() => Number)
  // @Expose({ name: 'user_id' })
  userId: number;

  @Expose()
  @IsString()
  content: string;

  @Type(() => Number)
  @Expose()
  grade: number;
}
