import { NextRequest } from "next/server";

import { getUserData, updateDb } from "@/lib/server/db";
import { failure, success } from "@/lib/server/response";
import { requireUser } from "@/lib/server/session";
import { TimerState } from "@/types/timer";
import { getUpdatedTimerState } from "@/utils/timerState";

function isTimer(value: unknown): value is TimerState {
  return (
    typeof value === "object" &&
    value !== null &&
    "mode" in value &&
    "timeLeft" in value &&
    "isRunning" in value &&
    "completedSessions" in value
  );
}

export async function GET(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  const timer = await updateDb((db) => {
    const userData = getUserData(db, session.user.id);
    userData.timer = getUpdatedTimerState(userData.timer);

    return userData.timer;
  });

  return success(timer);
}

export async function PUT(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  const body = (await request.json().catch(() => null)) as
    | { timer?: unknown }
    | null;

  if (!body || !isTimer(body.timer)) {
    return failure("Timer payload must include a timer object.", 422);
  }

  const timer = await updateDb((db) => {
    const userData = getUserData(db, session.user.id);
    userData.timer = getUpdatedTimerState(body.timer as TimerState);

    return userData.timer;
  });

  return success(timer, "Timer saved.");
}
