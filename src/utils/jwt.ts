import jwt, { Secret } from 'jsonwebtoken';
import { jwtSecret } from '../config';

export const setUserToken = (res: any, user: any) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    jwtSecret as Secret,
    {
      expiresIn: '1h',
    }
  );
  const refreshToken = jwt.sign(
    { userId: user.id, email: user.email },
    jwtSecret as Secret,
    {
      expiresIn: '14d',
    }
  );
  return { accessToken, refreshToken };
};
