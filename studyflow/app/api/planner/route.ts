import { NextRequest } from "next/server";

import { getUserData, updateDb } from "@/lib/server/db";
import { failure, success } from "@/lib/server/response";
import { requireUser } from "@/lib/server/session";
import { StudySession } from "@/types/planner";

function isPlanner(value: unknown): value is StudySession[] {
  return Array.isArray(value);
}

export async function GET(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  return success(
    getUserData(session.db, session.user.id).planner
  );
}

export async function PUT(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  const body = (await request.json().catch(() => null)) as
    | { planner?: unknown }
    | null;

  if (!body || !isPlanner(body.planner)) {
    return failure("Planner payload must include a planner array.", 422);
  }

  const planner = await updateDb((db) => {
    const userData = getUserData(db, session.user.id);
    userData.planner = body.planner as StudySession[];

    return userData.planner;
  });

  return success(planner, "Planner saved.");
}
