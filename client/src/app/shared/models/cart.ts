import { Course } from "./course";

export interface Cart {
  totalCourse: number;
  userAccountID: string;
  totalCost: number;
  courses?: Array<Course>;
}
