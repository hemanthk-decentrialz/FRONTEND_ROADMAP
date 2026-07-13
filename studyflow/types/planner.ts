export type Priority = "High" | "Medium" | "Low";

export type TimeSlot =
  | "Morning"
  | "Afternoon"
  | "Evening"
  | "Night";

export interface StudySession {
  id: number;
  subject: string;
  time: string;
  priority: Priority;
  slot: TimeSlot;
  completed: boolean;
}