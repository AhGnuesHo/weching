interface notice {
  notice: noticeType;
  createNotice(): Promise<noticeType[]>;
  findNotice(): Promise<noticeType[]>;
  findAll(): Promise<noticeType[]>;
}

type noticeType = {
  title: string;
  content: string;
};

export { notice, noticeType };
