import {
  IsArray,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import {
  advice,
  main,
  newPost,
  postWithReview,
  rank,
  user,
} from '../interfaces';
import 'reflect-metadata';
export class MainDto implements main {
  user: user;

  todoReview: newPost[];

  advice: advice;

  post: postWithReview[];

  // 상위 10명의 랭킹을 배열로 받아올 때
  // 유효성 검사를 위해 아래와 같은 데코레이터를 사용했는데
  // 적용이 되지 않는 것 같습니다
  @IsArray()
  @Length(10)
  ranking: rank[];

  @Expose()
  format(): any {
    const result: main = {
      user: this.user,
      todoReview: this.todoReview,
      post: this.post,
      advice: this.advice,
      ranking: this.ranking,
    };
    return result;
  }
}
