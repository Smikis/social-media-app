import type { Post } from './Post';

export type User = {
  id:        string;
  username:  string;
  email:     string;
  password:  string;
  tag:       string;
  createdAt: Date;
  followers: User[];
  following: User[];
  pfp:       string;
  posts:     Post[];
};