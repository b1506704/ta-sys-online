export interface Message {
  content: string;
  fileURL: string;
  isSeen:  boolean;
  senderId: string;
  recipientId: string;
}
