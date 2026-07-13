"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ProgressBar from "./ProgressBar";
import { Goal } from "@/types/goal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMinus,
  faBullseye,
  faCalendarDays,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface GoalCardProps {
  goal: Goal;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function GoalCard({
  goal,
  onIncrease,
  onDecrease,
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
        <div className="mb-2 flex items-center justify-between">
          <span className="text-muted text-sm font-medium">
            Progress
          </span>

          <span
            className="text-sm font-bold"
            style={{ color: "var(--primary)" }}
          >
            {goal.progress}%
          </span>
        </div>

        <ProgressBar progress={goal.progress} />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant="secondary"
          onClick={() => onDecrease(goal.id)}
        >
          <FontAwesomeIcon
            icon={faMinus}
            className="mr-2"
          />
          Decrease
        </Button>

        <Button
          onClick={() => onIncrease(goal.id)}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="mr-2"
          />
          Increase
        </Button>

        <Button
          variant="danger"
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