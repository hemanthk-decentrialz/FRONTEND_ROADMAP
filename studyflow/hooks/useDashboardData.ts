import useUserLocalStorage from "./useUserLocalStorage";
import { StudySession } from "@/types/planner";
import { Goal } from "@/types/goal";
import { Note } from "@/types/note";
import { TimerState } from "@/types/timer";
import {
  DEFAULT_TIMER_STATE,
  getUpdatedTimerState,
} from "@/utils/timerState";

export default function useDashboardData() {
  const [planner] = useUserLocalStorage<StudySession[]>(
    "planner",[]
  );
  const [notes] = useUserLocalStorage<Note[]>(
    "notes",[]
  );
  const [goals] = useUserLocalStorage<Goal[]>(
    "goals",[]
  );
  const [timer] = useUserLocalStorage<TimerState>(
    "study-timer",
    DEFAULT_TIMER_STATE
  );
  const currentTimer =
    getUpdatedTimerState(timer);
  const completedGoals = goals.filter(
    (goal) => goal.progress >= 100
  ).length;
  const completionRate =
    goals.length === 0 ? 0 : Math.round((completedGoals / goals.length) * 100);
  const pendingGoals =
    goals.length - completedGoals;
  const completedPlanner =
    planner.filter(
      (session) => session.completed
    ).length;
  const pendingPlanner = planner.length - completedPlanner;
  const totalNotes = notes.length;
  const totalSessions = currentTimer.completedSessions;

  return {
    planner, notes, goals, timer: currentTimer,
    completedGoals, pendingGoals,
    completionRate,
    completedPlanner, pendingPlanner,
    totalNotes, totalSessions,
  };
}
