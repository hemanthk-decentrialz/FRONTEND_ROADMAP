"use client";

import { useEffect, useRef } from "react";

import useAuth from "@/hooks/useAuth";
import useLocalStorage from "@/hooks/useLocalStorage";
import { isUnauthorizedApiError } from "@/lib/api/client";
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

export default function useUserLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const { user, isLoading } = useAuth();
  const loadedKeyRef = useRef<string | null>(null);
  const scopedKey = user
    ? `user:${user.id}:${key}`
    : `user:anonymous:${key}`;

  const [value, setValue] = useLocalStorage<T>(
    scopedKey,
    initialValue
  );

  useEffect(() => {
    if (isLoading || !user) {
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
          return;
        }

        if (isActive) {
          console.error(
            `Failed to load "${key}" from API:`,
            error
          );
        }
      }
    }

    loadApiData();

    return () => {
      isActive = false;
    };
  }, [isLoading, key, scopedKey, setValue, user]);

  useEffect(() => {
    if (
      isLoading ||
      !user ||
      loadedKeyRef.current !== scopedKey
    ) {
      return;
    }

    let isActive = true;

    async function saveApiData() {
      try {
        await persistApiValue(key, value);
      } catch (error) {
        if (isUnauthorizedApiError(error)) {
          return;
        }

        if (isActive) {
          console.error(
            `Failed to save "${key}" to API:`,
            error
          );
        }
      }
    }

    saveApiData();

    return () => {
      isActive = false;
    };
  }, [isLoading, key, scopedKey, user, value]);

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

async function persistApiValue<T>(
  key: string,
  value: T
) {
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
