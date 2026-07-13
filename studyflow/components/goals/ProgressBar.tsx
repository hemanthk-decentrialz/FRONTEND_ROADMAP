interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({
  progress,
}: ProgressBarProps) {
  const safeProgress = Math.min(
    100,
    Math.max(0, progress)
  );

  const progressColor =
    safeProgress >= 100
      ? "gradient-success"
      : safeProgress >= 70
      ? "gradient-primary"
      : safeProgress >= 40
      ? "gradient-warning"
      : "gradient-danger";

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-muted text-sm font-semibold">
          Progress
        </span>

        <span
          className="rounded-full px-3 py-1 text-xs font-bold"
          style={{
            background:
              safeProgress >= 100
                ? "rgba(34,197,94,.12)"
                : "var(--background)",
            color:
              safeProgress >= 100
                ? "#16a34a"
                : "var(--foreground)",
          }}
        >
          {safeProgress}%
        </span>
      </div>

      <div
        className="relative h-4 overflow-hidden rounded-full shadow-inner"
        style={{
          background: "var(--border)",
        }}
        role="progressbar"
        aria-valuenow={safeProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${progressColor} h-full rounded-full transition-all duration-700 ease-out`}
          style={{
            width: `${safeProgress}%`,
          }}
        />

        <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="text-muted mt-2 flex justify-between text-xs">
        <span>
          {safeProgress === 100
            ? "Completed 🎉"
            : safeProgress >= 70
            ? "Almost there 🚀"
            : safeProgress >= 40
            ? "Making progress 💪"
            : "Just getting started 🌱"}
        </span>

        <span>
          {100 - safeProgress}% remaining
        </span>
      </div>
    </div>
  );
}