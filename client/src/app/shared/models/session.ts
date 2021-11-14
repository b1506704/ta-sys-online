import { Course } from './course';
import { User } from './user';

export interface Session {
  id?: string;
  startTime: Date;
  endTime: Date;
  creatorId: string;
  creator?: User;
  courseTable?: Course;
  courseId: string;
}
