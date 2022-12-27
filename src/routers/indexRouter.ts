import { Request, Response, NextFunction } from 'express';

export const indexRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.redirect('/api/main');
};

// app.get('/', function (req) {
//   응답.sendFile(path.join(__dirname, '/client/build/index.html'));
// });
