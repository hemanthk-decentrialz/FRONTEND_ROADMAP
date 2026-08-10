import { NextRequest } from "next/server";

import { readDb } from "@/lib/server/db";
import { failure, success } from "@/lib/server/response";
import { verifyPassword } from "@/lib/auth";
import { SessionUser } from "@/types/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | {
        email?: string;
        password?: string;
      }
    | null;

  if (!body) {
    return failure("Invalid request payload.", 400);
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";

  if (!email || !password) {
    return failure("Email and password are required.", 422);
  }

  const db = await readDb();
  const user = db.users.find(
    (storedUser) => storedUser.email.toLowerCase() === email
  );

  if (!user || !(await verifyPassword(user, password))) {
    return failure("Invalid email or password.", 401);
  }

  const sessionUser: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const response = success(sessionUser, "Login successful.");

  response.cookies.set("studyflow-session-id", user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
