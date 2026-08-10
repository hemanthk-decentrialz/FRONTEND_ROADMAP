import { NextRequest } from "next/server";

import { getUserData, updateDb } from "@/lib/server/db";
import { failure, success } from "@/lib/server/response";
import { requireUser } from "@/lib/server/session";
import { Note } from "@/types/note";

function isNotes(value: unknown): value is Note[] {
  return Array.isArray(value);
}

export async function GET(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  return success(
    getUserData(session.db, session.user.id).notes
  );
}

export async function PUT(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  const body = (await request.json().catch(() => null)) as
    | { notes?: unknown }
    | null;

  if (!body || !isNotes(body.notes)) {
    return failure("Notes payload must include a notes array.", 422);
  }

  const notes = await updateDb((db) => {
    const userData = getUserData(db, session.user.id);
    userData.notes = body.notes as Note[];

    return userData.notes;
  });

  return success(notes, "Notes saved.");
}
