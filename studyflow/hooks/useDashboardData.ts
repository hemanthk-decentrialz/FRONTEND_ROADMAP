import useLocalStorage from "./useLocalStorage";
import { StudySession } from "@/types/planner";
import { Goal } from "@/types/goal";
import { Note } from "@/types/note";
import { TimerState } from "@/types/timer";

export default function useDashboardData() {
  const [planner] = useLocalStorage<StudySession[]>(
    "planner",[]
  );
  const [notes] = useLocalStorage<Note[]>(
    "notes",[]
  );
  const [goals] = useLocalStorage<Goal[]>(
    "goals",[]
  );
  const [timer] = useLocalStorage<TimerState>(
    "study-timer",
    {
      mode: "Pomodoro",
      timeLeft: 1500,
      isRunning: false,
      completedSessions: 0,
    }
  );
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
  const totalSessions = timer.completedSessions;

  return {
    planner, notes, goals, timer,
    completedGoals, pendingGoals,
    completionRate,
    completedPlanner, pendingPlanner,
    totalNotes, totalSessions,
  };
}