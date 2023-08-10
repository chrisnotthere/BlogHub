import { Comment } from '../models/comment.model';

export const comments: Comment[] = [
  {
    post_id: 1,
    user_id: 1,
    author: 'user1',
    content: 'Comment 1',
  },
  {
    post_id: 1,
    user_id: 2,
    author: 'user2',
    content: 'Comment 2',
  },
  {
    post_id: 2,
    user_id: 1,
    author: 'user1',
    content: 'Comment 3',
  },
  {
    post_id: 2,
    user_id: 2,
    author: 'user2',
    content: 'Comment 4',
  },
];
