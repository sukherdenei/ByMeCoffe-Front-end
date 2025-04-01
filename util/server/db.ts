import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL not set in .env file");
}

export const getClient = (): Client => {
  return new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

// 16 line rejectUnauthorized: false, developer uyed false product bolgoh uyed true bolgon //
