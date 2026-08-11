import { NextRequest } from "next/server";
import { success } from "@/lib/server/response";
import { requireUser } from "@/lib/server/session";

export async function GET(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  const response = success({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  });

  response.cookies.set(
    "studyflow-session-id",
    session.user.id,
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    }
  );

  return response;
}
