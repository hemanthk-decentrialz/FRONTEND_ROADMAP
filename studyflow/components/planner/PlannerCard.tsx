"use client";

import Card from "@/components/ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckCircle, faCircle, faClock, faFlag, faHourglassHalf} from "@fortawesome/free-solid-svg-icons";
import { StudySession } from "@/types/planner";

type PlannerCardProps = {
  session: StudySession;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export default function PlannerCard({
  session,
  onDelete,
  onToggle,
}: PlannerCardProps) {
  const timeLabel = formatSessionTime(
    session.time
  );
  const durationLabel = session.durationMinutes
    ? `${session.durationMinutes} min`
    : "Duration not set";

  const priorityColors = {
    High: {
      background: "rgba(239,68,68,.12)",
      color: "#dc2626",
    },
    Medium: {
      background: "rgba(245,158,11,.12)",
      color: "#d97706",
    },
    Low: {
      background: "rgba(34,197,94,.12)",
      color: "#16a34a",
    },
  };

  return (
    <Card
      className={`group transition-all duration-300 hover:-translate-y-1 ${
        session.completed ? "opacity-80" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggle(session.id)}
              className="transition hover:scale-110"
            >
              <FontAwesomeIcon
                icon={
                  session.completed
                    ? faCheckCircle
                    : faCircle
                }
                className="text-2xl"
                style={{
                  color: session.completed
                    ? "#16a34a"
                    : "var(--secondary)",
                }}
              />
            </button>

            <div>
              <h2
                className={`text-xl font-bold ${
                  session.completed
                    ? "line-through opacity-60"
                    : ""
                }`}
                style={{
                  color: "var(--foreground)",
                }}
              >
                {session.subject}
              </h2>

              <p className="text-muted mt-1 text-sm">
                {timeLabel}
              </p>
            </div>
          </div>
        </div>

        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={
            priorityColors[
              session.priority as keyof typeof priorityColors
            ]
          }
        >
          <FontAwesomeIcon
            icon={faFlag}
            className="mr-1"
          />
          {session.priority}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faClock}
            style={{ color: "var(--primary)" }}
          />

          <span className="text-muted font-medium">
            {timeLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faHourglassHalf}
            style={{ color: "var(--primary)" }}
          />

          <span className="text-muted font-medium">
            {durationLabel}
          </span>
        </div>
      </div>

      <div
        className="mt-8 flex items-center justify-between border-t pt-4"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <span
          className="text-sm font-medium"
          style={{
            color: session.completed
              ? "#16a34a"
              : "#d97706",
          }}
        >
          {session.completed
            ? "Completed"
            : "Pending"}
        </span>

        <button
          onClick={() => onDelete(session.id)}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-red-500 transition-all duration-300 hover:bg-red-500/10"
        >
          <FontAwesomeIcon icon={faTrash} />

          <span className="hidden sm:inline">
            Delete
          </span>
        </button>
      </div>
    </Card>
  );
}

function formatSessionTime(
  time: string
) {
  const [hourValue, minute = "00"] =
    time.split(":");
  const hour = Number(hourValue);

  if (!Number.isFinite(hour)) {
    return time;
  }

  const period =
    hour >= 12 ? "PM" : "AM";
  const displayHour =
    hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${minute} ${period}`;
}
