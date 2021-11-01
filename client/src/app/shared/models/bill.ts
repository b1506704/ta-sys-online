import { Course } from "./course";

export interface Bill {
  courseRequests: Array<Course>;
  userAccountId: string;
  totalCost: number;
  description: string;
  totalItem: number;
}
