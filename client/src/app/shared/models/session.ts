import { Course } from './course';
import { User } from './user';

export interface Session {
  startTime: Date;
  endTime: Date;
  maxParticipants: number;
  creatorId: string;
  creator?: User;
  courseTable?: Course;
  courseId: string;
}
