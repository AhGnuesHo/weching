interface EndPointInterface {
  index: string;
  user: string;
  guest: string;
  notice: string;
}

export const endPoint: EndPointInterface = {
  index: '/',
  user: '/api/user',
  guest: '/api/guest',
  notice: '/api/notice',
};
