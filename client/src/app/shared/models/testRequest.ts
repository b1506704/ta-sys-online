import { Question } from './question';

export interface TestRequest {
  testId: string;
  userId: string;
  isPractice: boolean;
  questionRequest: Array<Question>;
}
