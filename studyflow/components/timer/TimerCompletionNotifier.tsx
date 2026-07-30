"use client";

import { useEffect, useRef, useState } from "react";
import useTimer from "@/hooks/useTimer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function TimerCompletionNotifier() {
  const { timer } = useTimer();
  const lastNotifiedAt = useRef<number | undefined>(
    timer.lastCompletedAt
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (
      !timer.lastCompletedAt ||
      timer.lastCompletedAt ===
        lastNotifiedAt.current ||
      timer.isRunning
    ) {
      return;
    }

    lastNotifiedAt.current =
      timer.lastCompletedAt;

    const completedMode =
      timer.lastCompletedMode ?? timer.mode;

    setMessage(`${completedMode} session completed.`);

    const timeout = window.setTimeout(
      () => setMessage(""),
      5000
    );

    return () => window.clearTimeout(timeout);
  }, [
    timer.lastCompletedAt,
    timer.lastCompletedMode,
    timer.isRunning,
    timer.mode,
  ]);

  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-emerald-200 bg-white px-5 py-4 pr-12 shadow-2xl dark:border-emerald-900 dark:bg-slate-900">
      <button
        type="button"
        aria-label="Close timer notification"
        onClick={() => setMessage("")}
        className="absolute right-3 top-3 rounded-full p-2 text-emerald-600 transition hover:bg-emerald-500/10 dark:text-emerald-400"
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="h-4 w-4"
        />
      </button>

      <div role="status" aria-live="polite">
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          {message}
        </p>
        <p className="text-muted mt-1 text-xs">
          Your timer is ready for the next session.
        </p>
      </div>
    </div>
  );
}
