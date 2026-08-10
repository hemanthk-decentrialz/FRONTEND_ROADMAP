"use client";

import { useEffect, useState } from "react";
import useUserLocalStorage from "./useUserLocalStorage";
import useAuth from "@/hooks/useAuth";
import { getDashboardSummary } from "@/lib/api/dashboard";
import { DashboardSummary } from "@/types/api";
import { StudySession } from "@/types/planner";
import { Goal } from "@/types/goal";
import { Note } from "@/types/note";
import { TimerState } from "@/types/timer";
import { DEFAULT_TIMER_STATE, getUpdatedTimerState } from "@/utils/timerState";

export default function useDashboardData() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [planner] = useUserLocalStorage<StudySession[]>("planner",[]);
  const [notes] = useUserLocalStorage<Note[]>("notes",[]);
  const [goals] = useUserLocalStorage<Goal[]>("goals",[]);
  const [timer] = useUserLocalStorage<TimerState>("study-timer",DEFAULT_TIMER_STATE);
  const currentTimer = getUpdatedTimerState(timer);
  useEffect(() => {
    if (!user) {
      return;
    }
    let isActive = true;
    getDashboardSummary() .then((apiSummary) => {
        if (isActive) {
          setSummary(apiSummary);
        }
      })
      .catch((error) => {
        console.error(
          "Failed to load dashboard summary from API:", error
        );
      });
    return () => {
      isActive = false;
    };
  }, [user]);

  const completedGoals = goals.filter((goal) => goal.progress >= 100).length;
  const completionRate = goals.length === 0 ? 0 : Math.round((completedGoals / goals.length) * 100);
  const pendingGoals = goals.length - completedGoals;
  const completedPlanner = planner.filter((session) => session.completed).length;
  const pendingPlanner = planner.length - completedPlanner;
  const totalNotes = notes.length;
  const totalSessions = currentTimer.completedSessions;

  return {
    planner, notes, goals, timer: currentTimer,
    completedGoals: summary?.completedGoals ?? completedGoals,
    pendingGoals: summary?.pendingGoals ?? pendingGoals,
    completionRate: summary?.completionRate ?? completionRate,
    completedPlanner: summary?.completedPlanner ?? completedPlanner,
    pendingPlanner: summary?.pendingPlanner ?? pendingPlanner,
    totalNotes: summary?.totalNotes ?? totalNotes,
    totalSessions: summary?.totalSessions ?? totalSessions,
  };
}
