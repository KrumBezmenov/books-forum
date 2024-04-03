import { Post } from './post';

export interface User {
  themes: string[];
  posts: Post[];
  _id: string;
  email: string;
  password: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface UserForAuth {
  email: string;
  password: string;
  id: string;
}

export interface Auth {
  token: string;
  email: string;
  name: string;
}
