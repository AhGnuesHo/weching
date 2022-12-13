interface user {
  user: userType;
  createUser(): void;
  getUserInfo(): userType;
  
}

type userType = {
  email: string;
  password: string;
  ranking: number;
  point: number;
};

export { user, userType };
