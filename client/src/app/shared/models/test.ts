export interface Test {
    id?: string;
    courseId: string;
    name: string;
    description: string;
    allocatedTime: number;
    deadline: Date;
    maxQuestion: number;
    maxScore: number;
    maxAttempt: number;
}