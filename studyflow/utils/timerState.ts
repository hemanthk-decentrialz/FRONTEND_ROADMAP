import { TIMER_DURATION } from "@/data/timer";
import { TimerState } from "@/types/timer";

export const DEFAULT_TIMER_STATE: TimerState = {
  mode: "Pomodoro",
  timeLeft: TIMER_DURATION.Pomodoro,
  isRunning: false,
  completedSessions: 0,
};

export function getUpdatedTimerState(
  timer: TimerState,
  now = Date.now()
): TimerState {
  if (!timer.isRunning) {
    return timer;
  }

  const endAt =
    timer.endAt ??
    now + timer.timeLeft * 1000;
  const timeLeft = Math.max(
    0,
    Math.ceil((endAt - now) / 1000)
  );

  if (timeLeft > 0) {
    return {
      ...timer,
      endAt,
      timeLeft,
    };
  }

  return {
    ...timer,
    timeLeft: 0,
    isRunning: false,
    endAt: undefined,
    completedSessions:
      timer.completedSessions + 1,
    lastCompletedAt: now,
    lastCompletedMode: timer.mode,
  };
}
