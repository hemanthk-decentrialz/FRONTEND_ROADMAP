"use client";

import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import { getStorageItem, setStorageItem} from "@/lib/storage";

const LOCAL_STORAGE_CHANGE_EVENT = "studyflow-local-storage-change";

type LocalStorageChangeEvent = CustomEvent<{ key: string }>;

export default function useLocalStorage<T>( key: string, initialValue: T) {
  const initialValueRef =
    useRef(initialValue);

  const [storedState, setStoredState] =
    useState(() => ({
      key,
      value: getStorageItem<T>(
        key,
        initialValue
      ),
    }));

  useEffect(() => {
    setStoredState({
      key,
      value: getStorageItem<T>(
        key,
        initialValueRef.current
      ),
    });
  }, [key]);

  useEffect(() => {
    function syncFromStorage(event: Event) {
      const storageEvent =
        event as StorageEvent;
      const customEvent =
        event as LocalStorageChangeEvent;
      const changedKey =
        storageEvent.key ??
        customEvent.detail?.key;
      if (changedKey !== key) {
        return;
      }
      setStoredState({key, value: getStorageItem<T>(
          key,
          initialValueRef.current
        ),
      });
    }
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, syncFromStorage);

    return () => {
      window.removeEventListener(
        "storage",
        syncFromStorage
      );
      window.removeEventListener(
        LOCAL_STORAGE_CHANGE_EVENT,
        syncFromStorage
      );
    };
  }, [key]);

  useEffect(() => {
    const nextRaw =
      JSON.stringify(storedState.value);
    if (
      localStorage.getItem(storedState.key) ===
      nextRaw
    ) {
      return;
    }
    setStorageItem(storedState.key, storedState.value);
    notifyLocalStorageChange(storedState.key);
  }, [storedState]);

  const setStoredValue: Dispatch<SetStateAction<T>> =
    useCallback((value) => {
      setStoredState((previous) => {
        const nextValue = value instanceof Function ? value(previous.value) : value;
        return {
          key: previous.key,
          value: nextValue,
        };
      });
    }, []);

  return [storedState.value, setStoredValue,] as const;
}

export function notifyLocalStorageChange(key: string) {
  window.dispatchEvent(
    new CustomEvent(
      LOCAL_STORAGE_CHANGE_EVENT,
      {
        detail: { key },
      }
    )
  );
}
