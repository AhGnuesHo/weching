import { newReview } from '../interfaces';
import { Exclude, Expose, Type } from 'class-transformer';
import 'reflect-metadata';
import { IsString, Max } from 'class-validator';

export class ReviewDto implements newReview {
  @Type(() => Number)
  @Expose()
  id: number;

  @Type(() => Number)
  @Expose()
  postId: string;

  @Type(() => Number)
  @Expose()
  userId: number;

  @Expose()
  @IsString()
  content: string;

  @Type(() => Number)
  @Expose()
  grade: number;
}
