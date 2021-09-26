import { UserEntry } from './user-entry';

export interface ChatMessage {
  userEntry: UserEntry;
  message: string;
  date: string;
}
