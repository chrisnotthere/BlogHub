import dotenv from "dotenv";
dotenv.config({ path: '../../.env.local' });

import { User } from "../models/user.model";

export const users: User[] = [
  {
    username: 'guestUser',
    password: process.env.GUEST_PASSWORD as string,
    role: 'writer',
  },
  {
    username: 'guestAdmin',
    password: process.env.GUEST_ADMIN_PASSWORD as string,
    role: 'admin',
  },
  {
    username: 'user1',
    password: 'password1',
    role: 'admin',
  },
  {
    username: 'user2',
    password: 'password2',
    role: 'writer',
  },
];
