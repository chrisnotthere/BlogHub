import { Post } from "../models/post.model";

export const posts: Post[] = [
  {
    title: 'Post 1',
    content: 'Content 1',
    author: 'user1',
    user_id: 1,
    image: 'images/default.webp',
    tags: 'Technology',
  },
  {
    title: 'Post 2',
    content: 'Content 2',
    author: 'user2',
    user_id: 2,
    image: 'images/default.webp',
    tags: 'Food',
  },
];
