import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

if (process.env.POSTGRESQL === undefined) {
  throw new Error(
    '어플리케이션을 시작하려면 MONGODB_URI 환경변수가 필요합니다.'
  );
}

const port = parseInt(process.env.PORT ?? '8080', 10);
const user = process.env.POSTGRESURER;
const host = process.env.POSTGRESQL;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;
const postgresPort = parseInt(process.env.POSTGRESQLPORT ?? '5432');
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const jwtSecret = process.env.JWT_SECRET_KEY;
export {
  port,
  user,
  host,
  database,
  password,
  postgresPort,
  clientID,
  clientSecret,
  jwtSecret,
};
