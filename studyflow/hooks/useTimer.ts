"use client";

import useUserLocalStorage from "./useUserLocalStorage";

import { TIMER_DURATION } from "@/data/timer";
import { TimerMode, TimerState } from "@/types/timer";
import { formatTime } from "@/utils/formatTime";
import {
  DEFAULT_TIMER_STATE,
} from "@/utils/timerState";

export default function useTimer() {
  const [timer, setTimer] = useUserLocalStorage<TimerState>(
    "study-timer",
    DEFAULT_TIMER_STATE
  );

  function startTimer() {
    setTimer((previous) => ({
      ...previous,
      timeLeft:
        previous.timeLeft > 0
          ? previous.timeLeft
          : TIMER_DURATION[previous.mode],
      isRunning: true,
      endAt:
        Date.now() +
        (previous.timeLeft > 0
          ? previous.timeLeft
          : TIMER_DURATION[previous.mode]) *
          1000,
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
