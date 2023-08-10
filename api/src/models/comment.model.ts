export interface Comment {
  id?: number;
  post_id: number;
  user_id: number;
  author: string;
  content: string;
  likes?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CommentLike {
  id?: number;
  user_id: number;
  comment_id: number;
}
