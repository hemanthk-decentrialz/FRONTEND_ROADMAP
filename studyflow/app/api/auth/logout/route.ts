import { success } from "@/lib/server/response";

export async function POST() {
  const response = success(
    { loggedOut: true },
    "Logout successful."
  );

  response.cookies.set("studyflow-session-id", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
