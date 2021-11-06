import { User } from './user';

export interface Post {
  title: string;
  content: string;
  userAccountId: string;
  userAccountResponse?: User;
  postLikeResponses?: any;
  courseId: string;
}
