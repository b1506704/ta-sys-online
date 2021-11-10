import { User } from './user';

export interface Post {
  id?: string;
  title: string;
  content: string;
  userAccountId: string;
  userAccountResponse?: User;
  postLikeResponses?: any;
  courseId: string;
}
