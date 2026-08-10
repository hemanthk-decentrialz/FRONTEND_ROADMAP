import { apiRequest } from "@/lib/api/client";
import { Goal } from "@/types/goal";

export function getGoals() {
  return apiRequest<Goal[]>("/api/goals");
}

export function saveGoals(goals: Goal[]) {
  return apiRequest<Goal[]>("/api/goals", {
    method: "PUT",
    body: { goals },
  });
}
