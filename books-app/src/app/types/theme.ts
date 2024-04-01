import { Post } from './post';
import { User } from './user';

export interface Theme {
  subscribers: string[];
  posts: string[] | Post[];
  _id: string;
  description: string;
  image: string;
  author: string;
  genre: string;
  title: string;
  userId: User;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface themeDetails {
  title: string;
  genre: string;
  author: string;
  image: string;
  description: string;
}
