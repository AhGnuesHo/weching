interface user extends registerUserType {
  email: string;
  point: number;
}

interface registerUserType {
  nickName: string;
  birthday: Date;
}

export { user, registerUserType };
