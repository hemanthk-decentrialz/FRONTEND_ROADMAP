"use client";

import { useEffect, useRef } from "react";
import useAuth from "@/hooks/useAuth";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getGoals, saveGoals } from "@/lib/api/goals";
import { getNotes, saveNotes } from "@/lib/api/notes";
import { getPlanner, savePlanner } from "@/lib/api/planner";
import { getSettings, saveSettings } from "@/lib/api/settings";
import { getTimer, saveTimer } from "@/lib/api/timer";
import { Goal } from "@/types/goal";
import { Note } from "@/types/note";
import { StudySession } from "@/types/planner";
import { StudyFlowSettings } from "@/types/settings";
import { TimerState } from "@/types/timer";

function isUnauthorizedApiError(error: unknown) {
  return (
    error instanceof Error &&
    "status" in error &&
    error.status === 401
  );
}

export default function useUserLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const { user, logout } = useAuth();
  const loadedKeyRef = useRef<string | null>(null);
  const scopedKey = user ? `user:${user.id}:${key}` : `user:anonymous:${key}`;
  const [value, setValue] = useLocalStorage<T>(
    scopedKey,
    initialValue
  );

  useEffect(() => {
    if (!user) {
      loadedKeyRef.current = null;
      return;
    }

    let isActive = true;

    async function loadApiData() {
      try {
        const apiValue = await readApiValue<T>(key);
        if (isActive) {
          setValue(apiValue);
          loadedKeyRef.current = scopedKey;
        }
      } catch (error) {
        if (isUnauthorizedApiError(error)) {
          logout();
          return;
        }
        console.error(
          `Failed to load "${key}" from API:`,
          error
        );
      }
    }
    loadApiData();
    return () => {
      isActive = false;
    };
  }, [key, logout, scopedKey, setValue, user]);

  useEffect(() => {
    if (!user || loadedKeyRef.current !== scopedKey) {
      return;
    }

    persistApiValue(key, value).catch((error) => {
      if (isUnauthorizedApiError(error)) {
        logout();
        return;
      }
      console.error(
        `Failed to save "${key}" to API:`,
        error
      );
    });
  }, [key, logout, scopedKey, user, value]);
  return [value, setValue] as const;
}

async function readApiValue<T>(key: string): Promise<T> {
  if (key === "planner") {
    return (await getPlanner()) as T;
  }
  if (key === "notes") {
    return (await getNotes()) as T;
  }
  if (key === "goals") {
    return (await getGoals()) as T;
  }
  if (key === "study-timer") {
    return (await getTimer()) as T;
  }
  if (key === "settings") {
    return (await getSettings()) as T;
  }
  throw new Error(`Unsupported API storage key "${key}".`);
}

async function persistApiValue<T>( key: string, value: T) {
  if (key === "planner") {
    await savePlanner(value as StudySession[]);
    return;
  }
  if (key === "notes") {
    await saveNotes(value as Note[]);
    return;
  }
  if (key === "goals") {
    await saveGoals(value as Goal[]);
    return;
  }
  if (key === "study-timer") {
    await saveTimer(value as TimerState);
    return;
  }
  if (key === "settings") {
    await saveSettings(value as StudyFlowSettings);
  }
}
