interface EndPointInterface {
  index: string;
  user: string;
  guest: string;
  auth: string;
  post: string;
}

export const endPoint: EndPointInterface = {
  index: '/',
  auth: '/auth',
  user: '/api/user',
  guest: '/api/guest',
  post: '/api/post',
};
