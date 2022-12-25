import { UserEntity } from './userDto';
import { IsArray, Length } from 'class-validator';
import { Expose } from 'class-transformer';
import {
  advice,
  main,
  newPost,
  postWithReview,
  rank,
  user,
} from '../interfaces';
import 'reflect-metadata';

export class MainEntity {
  @Expose()
  user: UserEntity;

  @Expose()
  todoReview: newPost[];

  @Expose()
  advice: advice;

  @Expose()
  post: postWithReview[];

  @Expose()
  @IsArray()
  @Length(10)
  ranking: rank[];

  @Expose()
  format(): main {
    const result = {
      user: this.user,
      todoReview: this.todoReview,
      post: this.post,
      advice: this.advice,
      ranking: this.ranking,
    };
    return result;
  }
}
