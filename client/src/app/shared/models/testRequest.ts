import { Question } from './question';

export interface TestRequest {
  testId: string;
  userId: string;
  questionRequest: Array<Question>;
}
