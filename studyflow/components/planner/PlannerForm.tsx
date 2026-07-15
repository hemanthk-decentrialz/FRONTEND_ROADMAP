"use client";

import { useState } from "react";
import {
  Priority,
  StudySession,
} from "@/types/planner";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { subjects } from "@/data/subjects";

type PlannerFormProps = {
  onAddSession: (session: StudySession) => void;
};

export default function PlannerForm({
  onAddSession,
}: PlannerFormProps) {
  const [subject, setSubject] =
    useState("");

  const [time, setTime] =
    useState("");

  const [durationMinutes, setDurationMinutes] =
    useState(60);

  const [priority, setPriority] =
    useState<Priority>("Medium");

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!subject.trim()) {
      alert("Enter a subject");
      return;
    }

    if (!time) {
      alert("Please select a study time.");
      return;
    }

    if (
      !Number.isFinite(durationMinutes) ||
      durationMinutes < 15
    ) {
      alert("Duration must be at least 15 minutes.");
      return;
    }

    const newSession: StudySession = {
      id: Date.now(),
      subject,
      time,
      durationMinutes,
      priority,
      completed: false,
    };

    onAddSession(newSession);

    setSubject("");
    setTime("");
    setDurationMinutes(60);
    setPriority("Medium");
  }

  return (
    <Card>
      <h2
        className="mb-6 text-2xl font-bold"
        style={{
          color: "var(--foreground)",
        }}
      >
        Add Study Session
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <label className="block">
          <span className="text-muted mb-2 block text-sm font-medium">
            Subject
          </span>

          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            className="input-theme w-full rounded-lg p-3"
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((subject) => (
              <option
                key={subject}
                value={subject}
              >
                {subject}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-muted mb-2 block text-sm font-medium">
            Study Time
          </span>

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            className="input-theme w-full rounded-lg p-3"
          />
        </label>

        <label className="block">
          <span className="text-muted mb-2 block text-sm font-medium">
            Duration
          </span>

          <input
            type="number"
            min={15}
            step={15}
            value={durationMinutes}
            onChange={(e) =>
              setDurationMinutes(
                Number(e.target.value)
              )
            }
            className="input-theme w-full rounded-lg p-3"
            aria-label="Duration in minutes"
            placeholder="Duration in minutes"
          />
        </label>

        <label className="block">
          <span className="text-muted mb-2 block text-sm font-medium">
            Priority
          </span>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as Priority
              )
            }
            className="input-theme w-full rounded-lg p-3"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>

        <Button>
          Add Session
        </Button>
      </form>
    </Card>
  );
}
