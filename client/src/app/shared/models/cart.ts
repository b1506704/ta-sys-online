import { Course } from "./course";

export interface Cart {
  totalCourse: number;
  userAccountID: string;
  courses?: Array<Course>;
}
