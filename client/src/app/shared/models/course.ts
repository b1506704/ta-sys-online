export interface Course {
  name: string;
  summary: string;
  duration: number;
  description: string;
  availableSlot: number;
  maxSlot: number;
  rating: number;
  feedback: string;
  ratingCount: number;
  cost: number;
  subjectId: string;
  instructorId: string;
}
