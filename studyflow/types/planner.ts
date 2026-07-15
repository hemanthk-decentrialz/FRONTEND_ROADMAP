export type Priority = "High" | "Medium" | "Low";

export interface StudySession {
  id: number;
  subject: string;
  time: string;
  durationMinutes?: number;
  priority: Priority;
  completed: boolean;
}
