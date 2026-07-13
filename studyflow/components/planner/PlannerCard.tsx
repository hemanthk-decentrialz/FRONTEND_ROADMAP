"use client";

import Card from "@/components/ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckCircle, faCircle, faClock, faFlag} from "@fortawesome/free-solid-svg-icons";
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
                {session.slot}
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

      <div className="mt-6 flex items-center gap-2">
        <FontAwesomeIcon
          icon={faClock}
          style={{ color: "var(--primary)" }}
        />

        <span className="text-muted font-medium">
          {session.time}
        </span>
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