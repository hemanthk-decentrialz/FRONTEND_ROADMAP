export interface ApiSuccess<T> {
  ok: true;
  data: T;
  message?: string;
}

export interface ApiFailure {
  ok: false;
  error: string;
  details?: string[];
}

export type ApiResponse<T> =
  | ApiSuccess<T>
  | ApiFailure;

export interface DashboardSummary {
  completedGoals: number;
  pendingGoals: number;
  completionRate: number;
  completedPlanner: number;
  pendingPlanner: number;
  totalNotes: number;
  totalSessions: number;
}
