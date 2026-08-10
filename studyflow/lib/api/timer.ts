import { apiRequest } from "@/lib/api/client";
import { TimerState } from "@/types/timer";

export function getTimer() {
  return apiRequest<TimerState>("/api/timer");
}

export function saveTimer(timer: TimerState) {
  return apiRequest<TimerState>("/api/timer", {
    method: "PUT",
    body: { timer },
  });
}
