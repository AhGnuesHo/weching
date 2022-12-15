interface user {
  email: string;
  nickName: string;
  birthday: Date;
  point?: number;
}

interface post {
  userId: BigInt;
  content: string;
  status?: postStatus;
}

enum postStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
}

enum userEnum {
  USER = 'user',
  GUEST = 'guest',
}

export { user, post, postStatus, userEnum };
