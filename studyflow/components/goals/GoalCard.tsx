"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProgressBar from "./ProgressBar";
import { Goal } from "@/types/goal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBullseye,
  faCalendarDays,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface GoalCardProps {
  goal: Goal;
  onProgressChange: (
    id: number,
    progress: number
  ) => void;
  onDelete: (id: number) => void;
}

export default function GoalCard({
  goal,
  onProgressChange,
  onDelete,
}: GoalCardProps) {
  const completed = goal.progress >= 100;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="gradient-primary flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg">
            <FontAwesomeIcon
              icon={faBullseye}
              className="text-xl"
            />
          </div>

          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {goal.title}
            </h2>

            <p className="text-muted mt-1 text-sm">
              {goal.subject}
            </p>
          </div>
        </div>

        {completed && (
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "rgba(34,197,94,.12)",
              color: "#16a34a",
            }}
          >
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-1"
            />
            Completed
          </span>
        )}
      </div>

      <div
        className="mt-6 flex items-center gap-3 rounded-2xl p-4"
        style={{
          background: "var(--background)",
        }}
      >
        <FontAwesomeIcon
          icon={faCalendarDays}
          style={{ color: "var(--primary)" }}
        />

        <div>
          <p className="text-muted text-xs uppercase tracking-wide">
            Deadline
          </p>

          <p
            className="mt-1 text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            {goal.deadline}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <ProgressBar progress={goal.progress} />

        <label className="mt-5 block">
          <span className="text-muted mb-3 block text-sm font-medium">
            Set progress
          </span>

          <input
            type="range"
            min={0}
            max={100}
            step={10}
            value={goal.progress}
            onChange={(event) =>
              onProgressChange(
                goal.id,
                Number(event.target.value)
              )
            }
            className="w-full accent-blue-600"
            aria-label={`Progress for ${goal.title}`}
          />
        </label>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant="danger"
          className="w-auto"
          onClick={() => onDelete(goal.id)}
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="mr-2"
          />
          Delete
        </Button>
      </div>
    </Card>
  );
}
