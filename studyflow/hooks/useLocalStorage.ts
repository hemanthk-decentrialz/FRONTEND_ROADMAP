"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getStorageItem,
  setStorageItem,
} from "@/lib/storage";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
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
    setStorageItem(
      storedState.key,
      storedState.value
    );
  }, [storedState]);

  const setStoredValue: Dispatch<SetStateAction<T>> =
    useCallback((value) => {
      setStoredState((previous) => {
        const nextValue =
          value instanceof Function
            ? value(previous.value)
            : value;

        return {
          key: previous.key,
          value: nextValue,
        };
      });
    }, []);

  return [
    storedState.value,
    setStoredValue,
  ] as const;
}
