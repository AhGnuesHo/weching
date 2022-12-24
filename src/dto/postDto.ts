import { isNumber, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { newPost, postStatus } from '../interfaces';
import 'reflect-metadata';
export class PostDto implements newPost {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  public id: number;

  // body에서는 userId라는 변수명으로 받아오고
  // 디비 필드는 user_id로 되어있는데
  // Expose의 name을 user_id와 userId 두가지를 모두 정해 놓을 순 없나요?
  // 쿼리 결과도 역직렬화를 하고싶고, request받은 것도 역직렬화를 하고 싶습니다..!
  // 찾아보니 entity를 따로 만들어서 디비와 서비스 사이에 쓰는 것 같은데
  // 아직 dto와 entity의 관계성을 잘 모르겠어서 설명이 필요합니다!

  // @Expose({ name: 'user_id' })
  @Expose()
  @IsNumber()
  @Type(() => Number)
  public userId: number;

  @Expose()
  @IsString()
  public content: string;

  @Expose()
  public status?: postStatus;
}
