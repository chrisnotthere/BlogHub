import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { URL } from "url";

dotenv.config({ path: ".env.local" });

// docker db
if (process.env.DOCKER_DB) {
  process.env.DB_HOST = "db";
  process.env.DB_USER = "root";
  process.env.DB_PASSWORD = "password";
  process.env.DB_NAME = "blogdb";
}

// production db
if (process.env.JAWSDB_URL) {
  const jawsDBUrl = new URL(process.env.JAWSDB_URL);
  process.env.DB_HOST = jawsDBUrl.hostname;
  process.env.DB_USER = jawsDBUrl.username;
  process.env.DB_PASSWORD = jawsDBUrl.password;
  process.env.DB_NAME = jawsDBUrl.pathname.substring(1);
}

// local db
export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "bloghub",
  password: process.env.DB_PASSWORD,
});
