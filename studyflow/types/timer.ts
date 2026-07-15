export type TimerMode =
  | "Pomodoro"
  | "Short Break"
  | "Long Break";

export interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  completedSessions: number;
  endAt?: number;
  lastCompletedAt?: number;
  lastCompletedMode?: TimerMode;
}
