import { Lesson } from "./lesson";
import { Test } from "./test";

export interface Course {
  id: string;
  instructorID: String;
  instructorName: String;
  learnerID: String;
  learnerName: String;
  lessonList: Array<Lesson>;
  testList: Array<Test>;
}
