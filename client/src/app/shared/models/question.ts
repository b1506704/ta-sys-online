import { Answer } from './answer';

export interface Question {
  id?: string;
  testId: string;
  content: string;
  score: number;
  totalCorrectAnswer: number;
  answerRequests?: Array<Answer>;
}
