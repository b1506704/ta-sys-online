import { Course } from './course';

export interface Cart {
  totalCourse: number;
  userAccountId: string;
  totalCost: number;
  courses?: Array<Course>;
}
