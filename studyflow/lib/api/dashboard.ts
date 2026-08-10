import { apiRequest } from "@/lib/api/client";
import { DashboardSummary } from "@/types/api";

export function getDashboardSummary() {
  return apiRequest<DashboardSummary>("/api/dashboard");
}
