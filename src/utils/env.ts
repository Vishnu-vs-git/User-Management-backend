import dotenv from"dotenv";
dotenv.config()

export const ENV = {
PORT:process.env.PORT,
DB_HOST:process.env.DB_HOST,
DB_PORT:process.env.DB_PORT,
DB_USER:process.env.DB_USER,
DB_NAME:process.env.DB_NAME,
JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,
JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET,
JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
DB_PASSWORD:process.env.DB_PASSWORD,
DATABASE_URL:process.env.DATABASE_URL,
NODE_ENV:process.env.NODE_ENV,
ACCESS_TOKEN_MAX_AGE:process.env.ACCESS_TOKEN_MAX_AGE,
REFRESH_TOKEN_MAX_AGE:process.env.REFRESH_TOKEN_MAX_AGE
}
