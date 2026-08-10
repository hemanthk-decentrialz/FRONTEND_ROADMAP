import { NextRequest } from "next/server";

import { readDb } from "@/lib/server/db";
import { failure } from "@/lib/server/response";

export async function requireUser(
  request: NextRequest
) {
  const userId = request.headers.get("x-user-id");

  if (!userId) {
    return {
      error: failure("Authentication required.", 401),
    };
  }

  const db = await readDb();
  const user = db.users.find(
    (storedUser) => storedUser.id === userId
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
