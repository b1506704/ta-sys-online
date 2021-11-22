import { User } from './user';

export interface Message {
  id?: string;
  content: string;
  senderId: string;
  sender?: User;
  courseId: string;
  recipientId: string;
  date?: string;
}
