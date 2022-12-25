import { MainDto } from './../dto/mainDto';
import { plainToInstance } from 'class-transformer';
import { RankModel } from './rankModel';

import {
  IAdviceModel,
  IPostModel,
  IRankModel,
  IReviewModel,
  IUserModel,
  main,
} from '../interfaces';
import { ReviewModel, UserModel, AdviceModel, PostModel } from '../model';

import { applyMixins } from '../services/components';
import { postService } from '../services';

// 1.
// 서비스에서 의존성 주입을 할때 클래스 대신 인터페이스를 주입하는 이유가 클래스에 의존 관계가 너무 종속되어있어서
// 다른 객체를 가져와서 사용하려면 힘들기 때문에 인터페이스를 쓰는 것이라고 이해했습니다.
// 아래  Main은 여러 다른 인터페이스 (users, review.. 등)들을 같이 주입하려는 의도로 사용한 것인데
// 의도와 맞게사용한것인지 궁금합니다

export interface Main
  extends IReviewModel,
    IUserModel,
    IAdviceModel,
    IPostModel,
    IRankModel {}

export class Main {
  async mainInfo(id: number): Promise<MainDto> {
    const userInfo = await this.userInfo(id);
    const todoReview = await this.todoReview(id);
    const advice = await this.getAdvice();

    // 2.
    // 다른 함수들은 직접 this로 불러와서 사용했는데
    // post는 postService의 getPosts에서 게시물과 게시물에 달린 리뷰를 합치는 로직을 거쳐서 가져옵니다
    // postService를 import해서 사용하면 이건 DI에 맞지 않는 것 같은데 어떤 식으로 사용하면 좋을까요?

    const post = await postService.getPosts(id);
    const ranking = await this.getBest();

    const result: main = {
      user: userInfo,
      todoReview: todoReview,
      advice: advice,
      post: post,
      ranking: ranking,
    };

    return plainToInstance(MainDto, result);
  }
}

applyMixins(Main, [ReviewModel, UserModel, AdviceModel, PostModel, RankModel]);

export const mainModel = new Main();
