"use client";

import { useState } from "react";
import {
  Priority,
  TimeSlot,
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

  const [priority, setPriority] =
    useState<Priority>("Medium");

  const [slot, setSlot] =
    useState<TimeSlot>("Morning");

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

    const newSession: StudySession = {
      id: Date.now(),
      subject,
      time,
      priority,
      slot,
      completed: false,
    };

    onAddSession(newSession);

    setSubject("");
    setTime("");
    setPriority("Medium");
    setSlot("Morning");
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

        <input
          type="time"
          value={time}
          onChange={(e) =>
            setTime(e.target.value)
          }
          className="input-theme w-full rounded-lg p-3"
        />

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

        <select
          value={slot}
          onChange={(e) =>
            setSlot(
              e.target.value as TimeSlot
            )
          }
          className="input-theme w-full rounded-lg p-3"
        >
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

        <Button>
          Add Session
        </Button>
      </form>
    </Card>
  );
}