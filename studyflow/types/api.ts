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
  plannerCount: number;
  completedGoals: number;
  pendingGoals: number;
  totalGoals: number;
  completionRate: number;
  completedPlanner: number;
  pendingPlanner: number;
  plannerCompletionRate: number;
  totalNotes: number;
  totalSessions: number;
  activeGoalTitle: string;
}
