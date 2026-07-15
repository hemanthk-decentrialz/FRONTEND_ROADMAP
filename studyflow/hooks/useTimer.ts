"use client";

import { useEffect } from "react";

import useUserLocalStorage from "./useUserLocalStorage";

import { TIMER_DURATION } from "@/data/timer";
import { TimerMode, TimerState } from "@/types/timer";
import { formatTime } from "@/utils/formatTime";

export default function useTimer() {
  const [timer, setTimer] = useUserLocalStorage<TimerState>(
    "study-timer",
    {
      mode: "Pomodoro",
      timeLeft: TIMER_DURATION.Pomodoro,
      isRunning: false,
      completedSessions: 0,
    }
  );

  useEffect(() => {
    if (!timer.isRunning) return;

    function syncTimer() {
      setTimer((previous) => {
        if (!previous.isRunning) {
          return previous;
        }

        const endAt =
          previous.endAt ??
          Date.now() +
            previous.timeLeft * 1000;
        const nextTimeLeft = Math.max(
          0,
          Math.ceil(
            (endAt - Date.now()) / 1000
          )
        );

        if (nextTimeLeft <= 0) {
          const completedSessions =
            previous.mode === "Pomodoro"
              ? previous.completedSessions + 1
              : previous.completedSessions;

          return {
            ...previous,
            timeLeft: 0,
            isRunning: false,
            endAt: undefined,
            completedSessions,
          };
        }

        return {
          ...previous,
          endAt,
          timeLeft: nextTimeLeft,
        };
      });
    }

    syncTimer();

    const interval = setInterval(
      syncTimer,
      1000
    );

    return () => clearInterval(interval);
  }, [timer.isRunning, setTimer]);

  function startTimer() {
    setTimer((previous) => ({
      ...previous,
      isRunning: true,
      endAt:
        Date.now() +
        previous.timeLeft * 1000,
    }));
  }

  function pauseTimer() {
    setTimer((previous) => {
      const timeLeft =
        previous.endAt && previous.isRunning
          ? Math.max(
              0,
              Math.ceil(
                (previous.endAt - Date.now()) /
                  1000
              )
            )
          : previous.timeLeft;

      return {
        ...previous,
        timeLeft,
        isRunning: false,
        endAt: undefined,
      };
    });
  }

  function resetTimer() {
    setTimer((previous) => ({
      ...previous,
      isRunning: false,
      timeLeft: TIMER_DURATION[previous.mode],
      endAt: undefined,
    }));
  }

  function changeMode(mode: TimerMode) {
    setTimer((previous) => ({
      ...previous,
      mode,
      timeLeft: TIMER_DURATION[mode],
      isRunning: false,
      endAt: undefined,
    }));
  }

  return {
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
    formatTime,
  };
}
