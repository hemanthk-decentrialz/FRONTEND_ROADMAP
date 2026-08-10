import { NextRequest } from "next/server";

import { getUserData, updateDb } from "@/lib/server/db";
import { failure, success } from "@/lib/server/response";
import { requireUser } from "@/lib/server/session";
import { Goal } from "@/types/goal";

function isGoals(value: unknown): value is Goal[] {
  return Array.isArray(value);
}

export async function GET(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  return success(
    getUserData(session.db, session.user.id).goals
  );
}

export async function PUT(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  const body = (await request.json().catch(() => null)) as
    | { goals?: unknown }
    | null;

  if (!body || !isGoals(body.goals)) {
    return failure("Goals payload must include a goals array.", 422);
  }

  const goals = await updateDb((db) => {
    const userData = getUserData(db, session.user.id);
    userData.goals = body.goals as Goal[];

    return userData.goals;
  });

  return success(goals, "Goals saved.");
}
