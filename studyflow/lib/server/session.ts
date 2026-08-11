import { NextRequest } from "next/server";

import { readDb } from "@/lib/server/db";
import { failure } from "@/lib/server/response";

export async function requireUser(
  request: NextRequest
) {
  const headerUserId = request.headers.get("x-user-id");
  const cookieUserId =
    request.cookies.get("studyflow-session-id")?.value;

  if (!headerUserId && !cookieUserId) {
    return {
      error: failure("Authentication required.", 401),
    };
  }

  const db = await readDb();
  const user =
    db.users.find(
      (storedUser) => storedUser.id === cookieUserId
    ) ??
    db.users.find(
      (storedUser) => storedUser.id === headerUserId
    );

  if (!user) {
    return {
      error: failure("Invalid user session.", 401),
    };
  }

  return {
    db,
    user,
  };
}
