"use client";

import { useEffect } from "react";

import useLocalStorage from "./useLocalStorage";

import { TIMER_DURATION } from "@/data/timer";
import { TimerMode, TimerState } from "@/types/timer";

export default function useTimer() {
  const [timer, setTimer] = useLocalStorage<TimerState>(
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

    const interval = setInterval(() => {
      setTimer((previous) => {
        if (previous.timeLeft <= 1) {
          clearInterval(interval);

          return {
            ...previous,
            timeLeft: 0,
            isRunning: false,
            completedSessions:
              previous.mode === "Pomodoro"
                ? previous.completedSessions + 1
                : previous.completedSessions,
          };
        }

        return {
          ...previous,
          timeLeft: previous.timeLeft - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.isRunning, setTimer]);

  function startTimer() {
    setTimer((previous) => ({
      ...previous,
      isRunning: true,
    }));
  }

  function pauseTimer() {
    setTimer((previous) => ({
      ...previous,
      isRunning: false,
    }));
  }

  function resetTimer() {
    setTimer((previous) => ({
      ...previous,
      isRunning: false,
      timeLeft: TIMER_DURATION[previous.mode],
    }));
  }

  function changeMode(mode: TimerMode) {
    setTimer((previous) => ({
      ...previous,
      mode,
      timeLeft: TIMER_DURATION[mode],
      isRunning: false,
    }));
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
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