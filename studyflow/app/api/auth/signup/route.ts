import { NextRequest } from "next/server";

import { updateDb } from "@/lib/server/db";
import { failure, success } from "@/lib/server/response";
import { hashPassword } from "@/lib/auth";
import { SessionUser, User } from "@/types/auth";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | {
        name?: string;
        email?: string;
        password?: string;
      }
    | null;

  if (!body) {
    return failure("Invalid request payload.", 400);
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const errors: string[] = [];

  if (!name) {
    errors.push("Name is required.");
  }

  if (!email) {
    errors.push("Email is required.");
  } else if (!isValidEmail(email)) {
    errors.push("Email is invalid.");
  }

  if (password.length < 8) {
    errors.push("Password must contain at least 8 characters.");
  }

  if (errors.length > 0) {
    return failure("Validation failed.", 422, errors);
  }

  const passwordHash = await hashPassword(password);

  const createdUser = await updateDb<SessionUser | null>((db) => {
    const existingUser = db.users.find(
      (user) => user.email.toLowerCase() === email
    );

    if (existingUser) {
      return null;
    }

    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash,
    };

    db.users.push(user);
    db.data[user.id] = {
      planner: [],
      notes: [],
      goals: [],
      timer: {
        mode: "Pomodoro",
        timeLeft: 25 * 60,
        isRunning: false,
        completedSessions: 0,
      },
      settings: {
        theme: "light",
      },
    };

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });

  if (!createdUser) {
    return failure("An account already exists with this email.", 409);
  }

  return success(createdUser, "Account created successfully.", 201);
}
