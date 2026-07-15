"use client";

import { useEffect, useRef, useState } from "react";
import useTimer from "@/hooks/useTimer";

export default function TimerCompletionNotifier() {
  const { timer } = useTimer();
  const lastNotifiedAt = useRef<number | undefined>(
    undefined
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (
      !timer.lastCompletedAt ||
      timer.lastCompletedAt ===
        lastNotifiedAt.current
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
    timer.mode,
  ]);

  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-2xl dark:border-emerald-900 dark:bg-slate-900">
      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        {message}
      </p>
      <p className="text-muted mt-1 text-xs">
        Your timer is ready for the next session.
      </p>
    </div>
  );
}
