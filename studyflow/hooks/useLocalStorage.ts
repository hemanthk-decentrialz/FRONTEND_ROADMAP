"use client";

import { useEffect, useState } from "react";

import {
  getStorageItem,
  setStorageItem,
} from "@/lib/storage";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
   const [storedValue, setStoredValue] = useState<T>(() =>
    getStorageItem<T>(key, initialValue)
    );

  useEffect(() => {
    setStorageItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}