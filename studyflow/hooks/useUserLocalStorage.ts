"use client";

import useAuth from "@/hooks/useAuth";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function useUserLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const { user } = useAuth();
  const scopedKey = user
    ? `user:${user.id}:${key}`
    : `user:anonymous:${key}`;

  return useLocalStorage<T>(
    scopedKey,
    initialValue
  );
}
