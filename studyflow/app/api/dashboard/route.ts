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

  return success({
    completedGoals,
    pendingGoals: userData.goals.length - completedGoals,
    completionRate:
      userData.goals.length === 0
        ? 0
        : Math.round(
            (completedGoals / userData.goals.length) * 100
          ),
    completedPlanner,
    pendingPlanner: userData.planner.length - completedPlanner,
    totalNotes: userData.notes.length,
    totalSessions: currentTimer.completedSessions,
  });
}
