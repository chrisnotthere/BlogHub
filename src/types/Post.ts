export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  user_id: number;
  image: string;
  tags: string;
  created_at?: string;
}

export const TAGS = [
  'Technology',
  'Food',
  'Health',
  'Travel',
  'Business',
  'Entertainment',
  'Education',
  'Miscellaneous'
];
