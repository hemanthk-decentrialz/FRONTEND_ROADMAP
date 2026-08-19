"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { getDashboardSummary } from "@/lib/api/dashboard";
import { isUnauthorizedApiError } from "@/lib/api/client";
import { DashboardSummary } from "@/types/api";

export default function useDashboardData() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [data, setData] = useState<{
    userId: string | null;
    summary: DashboardSummary | null;
  }>({
    userId: null,
    summary: null,
  });
  const isLoading = isAuthLoading || (user !== null && data.userId !== user.id);

  useEffect(() => {
    if (isAuthLoading || !user) {
      return;
    }

    const userId = user.id;
    let isActive = true;

    getDashboardSummary()
      .then((nextSummary) => {
        if (isActive) {
          setData({
            userId,
            summary: nextSummary,
          });
        }
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        if (!isUnauthorizedApiError(error)) {
          console.error(
            "Failed to load dashboard summary:",
            error
          );
        }

        setData({
          userId,
          summary: null,
        });
      });

    return () => {
      isActive = false;
    };
  }, [isAuthLoading, user]);

  return {
    summary: data.summary,
    isLoading,
  };
}
