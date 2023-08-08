export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  user_id: number;
  image: string;
  tags: string;
}

export const TAGS = [
  'technology',
  'food',
  'health & wellness',
  'travel',
  'business',
  'arts & culture',
  'education',
  'social & political',
  'miscellaneous'
];
