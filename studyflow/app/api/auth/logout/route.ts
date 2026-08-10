import { success } from "@/lib/server/response";

export async function POST() {
  return success({ loggedOut: true }, "Logout successful.");
}
