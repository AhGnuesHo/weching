import { user } from '../config';
import { main } from '../interfaces';
import { ReviewModel, UserModel, AdviceModel } from '../model';
import { postService } from '../services';

import { applyMixins } from '../services/components';
export interface Main extends ReviewModel, UserModel, AdviceModel {}

export class Main {
  async mainInfo(id: number): Promise<main> {
    const userInfo = await this.userInfo(id);
    const todoReview = await this.todoReview(id);
    const advice = await this.getAdvice();
    const post = await postService.getPosts(id);
    //내가 쓴게시글
    //랭킹 정보 (5개)
    const result: main = {
      user: userInfo,
      todoReview: todoReview,
      advice: advice,
      post: post,
    };
    return result;
  }
}

applyMixins(Main, [ReviewModel, UserModel, AdviceModel]);

export const mainModel = new Main();
