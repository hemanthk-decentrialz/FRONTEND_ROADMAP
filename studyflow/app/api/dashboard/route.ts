import { NextRequest } from "next/server";
import { getUserData } from "@/lib/server/db";
import { success } from "@/lib/server/response";
import { requireUser } from "@/lib/server/session";
import { getUpdatedTimerState } from "@/utils/timerState";

export async function GET(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  const userData = getUserData(session.db, session.user.id);
  const completedGoals = userData.goals.filter(
    (goal) => goal.progress >= 100
  ).length;
  const completedPlanner = userData.planner.filter(
    (planner) => planner.completed
  ).length;
  const currentTimer = getUpdatedTimerState(userData.timer);
  const plannerCount = userData.planner.length;
  const totalGoals = userData.goals.length;

  return success({
    plannerCount,
    completedGoals,
    pendingGoals: totalGoals - completedGoals,
    totalGoals,
    completionRate: totalGoals === 0
        ? 0
        : Math.round(
            (completedGoals / totalGoals) * 100
          ),
    completedPlanner,
    pendingPlanner: plannerCount - completedPlanner,
    plannerCompletionRate: plannerCount === 0
        ? 0
        : Math.round(
            (completedPlanner / plannerCount) * 100
          ),
    totalNotes: userData.notes.length,
    totalSessions: currentTimer.completedSessions,
    activeGoalTitle: userData.goals.find((goal) => goal.progress < 100) ?.title ?? "No active goals",
  });
}
