import { User } from "../models/user.model";

export const users: User[] = [
  {
    username: 'guestUser',
    password: 'supersecret',
    role: 'writer',
  },
  {
    username: 'guestAdmin',
    password: 'adminsecret',
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
