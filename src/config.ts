import dotenv from "dotenv";
const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

if (process.env.POSTGRESQL === undefined) {
  throw new Error(
    "어플리케이션을 시작하려면 POSTGRESQL 환경변수가 필요합니다."
  );
}

export const port = parseInt(process.env.PORT ?? "8080", 10);
export const user = process.env.POSTGRESURER;
export const host = process.env.POSTGRESQL;
export const database = process.env.DATABASE;
export const password = process.env.PASSWORD;
export const postgresPort = parseInt(process.env.POSTGRESQLPORT ?? "5432");
export const clientID = process.env.GOOGLE_CLIENT_ID;
export const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const jwtSecret = process.env.JWT_SECRET_KEY;
