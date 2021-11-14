import { User } from './user';

export interface Message {
  id?: string;
  content: string;
  senderId: string;
  senderAccountResponse?: User;
  courseId: string;
  recipientId: string;
}
