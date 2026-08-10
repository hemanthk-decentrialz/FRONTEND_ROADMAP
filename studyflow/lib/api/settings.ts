import { apiRequest } from "@/lib/api/client";
import { StudyFlowSettings } from "@/types/settings";

export function getSettings() {
  return apiRequest<StudyFlowSettings>("/api/settings");
}

export function saveSettings(settings: StudyFlowSettings) {
  return apiRequest<StudyFlowSettings>("/api/settings", {
    method: "PUT",
    body: { settings },
  });
}

export function resetStudyData() {
  return apiRequest<{ reset: true }>("/api/settings", {
    method: "DELETE",
  });
}
