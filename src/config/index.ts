import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  HOST,
  CLIENT_HOST,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_CERT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,

  // S3
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_ENDPOINT,
  S3_BUCKET,
  S3_REGION,
  S3_MAX_FILE_SIZE,

  // OAUTH
  OAUTH_URL,
  OAUTH_USER_INFO_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
} = process.env;
