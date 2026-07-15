"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import useTimer from "@/hooks/useTimer";
import { TIMER_DURATION } from "@/data/timer";
import { TimerMode } from "@/types/timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateLeft,
  faFire,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function StudyTimer() {
  const {
    timer,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
    formatTime,
  } = useTimer();
  const dailyGoal = 4;
  const dailyProgress = Math.min(
    100,
    Math.round(
      (timer.completedSessions / dailyGoal) * 100
    )
  );

  return (
    <Card className="overflow-hidden">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2
            className="text-3xl font-bold"
            style={{
              color: "var(--foreground)",
            }}
          >
            Pomodoro Timer
          </h2>

          <p className="text-muted mt-1 text-sm">
            Stay focused and study smarter.
          </p>
        </div>

        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background:
              "rgba(37,99,235,.12)",
            color: "var(--primary)",
          }}
        >
          <FontAwesomeIcon
            icon={faClock}
            className="text-2xl"
          />
        </div>
      </div>

      <div className="mb-10 flex justify-center">
        <div
          className="gradient-primary relative flex h-72 w-72 items-center justify-center rounded-full border-8 shadow-xl transition-all duration-300"
          style={{
            borderColor:
              "var(--primary)",
          }}
        >
          <div
            className="absolute h-60 w-60 rounded-full"
            style={{
              border:
                "1px solid var(--border)",
            }}
          />

          <div className="text-center">
            <p className="mb-2 text-sm uppercase tracking-widest text-white/80">
              {timer.mode}
            </p>

            <h1 className="text-6xl font-bold text-white">
              {formatTime(
                timer.timeLeft
              )}
            </h1>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {(Object.keys(
          TIMER_DURATION
        ) as TimerMode[]).map(
          (timerMode) => (
            <button
              key={timerMode}
              onClick={() =>
                changeMode(timerMode)
              }
              className={`rounded-2xl px-5 py-3 font-semibold transition-all duration-300 ${
                timer.mode ===
                timerMode
                  ? "gradient-primary text-white shadow-lg"
                  : "surface surface-hover"
              }`}
            >
              {timerMode}
            </button>
          )
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Button onClick={startTimer}>
          <FontAwesomeIcon
            icon={faPlay}
            className="mr-2"
          />
          Start
        </Button>

        <Button
          variant="secondary"
          onClick={pauseTimer}
        >
          <FontAwesomeIcon
            icon={faPause}
            className="mr-2"
          />
          Pause
        </Button>

        <Button
          variant="danger"
          onClick={resetTimer}
        >
          <FontAwesomeIcon
            icon={faRotateLeft}
            className="mr-2"
          />
          Reset
        </Button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div
          className="rounded-2xl p-5"
          style={{
            background:
              "var(--background)",
          }}
        >
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faFire}
              className="text-xl text-orange-500"
            />

            <div>
              <p className="text-muted text-sm">
                Completed Sessions
              </p>

              <h3
                className="mb-3 text-xl font-semibold"
                style={{
                  color:
                    "var(--foreground)",
                }}
              >
                {
                  timer.completedSessions
                }
              </h3>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl p-5"
          style={{
            background:
              "var(--background)",
          }}
        >
          <p className="text-muted mb-3 text-sm">
            Today&apos;s Goal
          </p>

          <div
            className="h-3 overflow-hidden rounded-full"
            style={{
              background:
                "var(--border)",
            }}
          >
            <div
              className="gradient-primary h-full rounded-full"
              style={{
                width: `${dailyProgress}%`,
              }}
            />
          </div>

          <p className="text-muted mt-3 text-sm">
            {dailyProgress}% Completed
          </p>
        </div>
      </div>
    </Card>
  );
}
