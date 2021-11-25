import { Question } from './question';

export interface TestResult {
  id?: string;
  testId: string;
  userId: string;
  questionResponses: Array<Question>;
}
