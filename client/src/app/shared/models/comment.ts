import { User } from './user';

export interface Comment {
  id?: string;
  postId: string;
  content: string;
  userAccountId: string;
  userAccountResponse?: User;
}
