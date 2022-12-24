import { isNumber, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { newPost, postStatus } from '../interfaces';
export class PostDto implements newPost {
  @Expose()
  @IsNumber()
  public id: string;

  @Expose()
  @IsNumber()
  public userId: number;

  @Expose()
  @IsString()
  public content: string;

  @Expose()
  public status?: postStatus;

  constructor(
    id: string,
    userId: number,
    content: string,
    status?: postStatus
  ) {
    this.id = id;
    this.userId = userId;
    this.content = content;
    this.status = status;
  }

  @Expose()
  get strToNumber(): number {
    const id = parseInt(this.id, 10);
    return id;
  }
}
