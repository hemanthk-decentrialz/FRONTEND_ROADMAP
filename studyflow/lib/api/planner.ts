import { apiRequest } from "@/lib/api/client";
import { StudySession } from "@/types/planner";

export function getPlanner() {
  return apiRequest<StudySession[]>("/api/planner");
}

export function savePlanner(planner: StudySession[]) {
  return apiRequest<StudySession[]>("/api/planner", {
    method: "PUT",
    body: { planner },
  });
}
