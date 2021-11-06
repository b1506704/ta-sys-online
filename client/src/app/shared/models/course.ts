export interface Course {
  id: string;
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
