export interface Test {
    courseId: string;
    name: string;
    description: string;
    allocatedTime: number;
    deadline: Date;
    totalQuestions: number;
    maxScore: number;
    totalAttempt: number;
    maxAttempt: number;
}