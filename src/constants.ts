interface EndPointInterface {
  index: string;
  main: string;
  user: string;
  guest: string;
  auth: string;
  post: string;
  notice: string;
  review: string;
  advice: string;
  report: string;
}

export const endPoint: EndPointInterface = {
  index: '/',
  auth: '/auth',
  main: '/api/main',
  user: '/api/user',
  guest: '/api/guest',
  notice: '/api/notice',
  post: '/api/post',
  review: '/api/review',
  advice: '/api/advice',
  report: '/api/report',
};
