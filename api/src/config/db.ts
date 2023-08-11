import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const connectionConfig = process.env.JAWSDB_URL
  ? { url: process.env.JAWSDB_URL }
  : {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      database: process.env.DB_NAME || "bloghub",
      password: process.env.DB_PASSWORD,
    };

export const db = mysql.createPool(connectionConfig);
