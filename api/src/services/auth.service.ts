import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";

interface MyJwtPayload extends JwtPayload {
  userId: number;
}

// Retrieve a user's information using their username
export const findUserByUsername = async (username: string) => {
  const [users]: any = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  return users as User[];
};

// Create a new user
export const createUser = async (user: User) => {
  const { username, password, role } = user;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await db.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [
    username, hashedPassword, role
  ]);
};

// Validate a user's password
export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate a JWT for a user
export const generateJwtToken = (userId: number, secret: string) => {
  return jwt.sign({ userId }, secret, { expiresIn: "1h" });
};

// Verify a JWT
export const verifyJwtToken = (token: string, secret: string): MyJwtPayload => {
  return jwt.verify(token, secret) as MyJwtPayload;
};

// Retrieve a user's information using their id
export const findUserById = async (userId: number) => {
  const [users]: any = await db.query("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);
  return users as User[];
};
