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
    username: 'johnDoe',
    password: 'password123',
    role: 'member',
  },
  {
    username: 'janeSmith',
    password: 'janePass456',
    role: 'writer',
  },
  {
    username: 'michaelBrown',
    password: 'mikeB789',
    role: 'admin',
  },
  {
    username: 'sarahJohnson',
    password: 'sarahJ111',
    role: 'writer',
  },
  {
    username: 'williamLee',
    password: 'williamL222',
    role: 'member',
  },
  {
    username: 'emmaDavis',
    password: 'emmaD333',
    role: 'admin',
  },
];
