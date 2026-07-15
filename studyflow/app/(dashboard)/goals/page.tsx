"use client";

import { useState } from "react";
import GoalCard from "@/components/goals/GoalCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import useUserLocalStorage from "@/hooks/useUserLocalStorage";
import { Goal } from "@/types/goal";
import { subjects } from "@/data/subjects";

export default function GoalsPage() {
  const [goals, setGoals] = useUserLocalStorage<Goal[]>(
    "goals", []
  );
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");

  function addGoal() {
    if (!title.trim()) {
      alert("Please enter a goal title.");
      return;
    }
    if (!subject) {
      alert("Please select a subject.");
      return;
    }
    if (!deadline) {
      alert("Please choose a deadline.");
      return;
    }
    setGoals((previousGoals) => [
      ...previousGoals,
      {
        id: Date.now(), title, subject, deadline, progress: 0,
      },
    ]);
    setTitle("");
    setSubject("");
    setDeadline("");
  }

  function deleteGoal(id: number) {
    setGoals((previousGoals) => previousGoals.filter(
        (goal) => goal.id !== id
      )
    );
  }

  function updateProgress(
    id: number,
    progress: number
  ) {
    setGoals((previousGoals) =>
      previousGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress,
            }
          : goal
      )
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">
        Goal Tracker
      </h1>
      <div className="grid items-start gap-8 lg:grid-cols-3">
        <Card className="lg:sticky lg:top-24">
          <h2 className="mb-5 text-2xl font-bold">
            Add Goal
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Goal Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="input-theme w-full rounded-lg p-3"
            />
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
              type="date"
              value={deadline}
              onChange={(e) =>
                setDeadline(e.target.value)
              }
              className="input-theme w-full rounded-lg p-3"
            />
            <Button onClick={addGoal}>
              Add Goal
            </Button>
          </div>
        </Card>
        <div className="space-y-6 lg:col-span-2">
          {goals.length === 0 ? (
            <Card>
              <p className="text-muted text-center">
                No goals added yet.
              </p>
            </Card>
          ) : (
            goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onProgressChange={updateProgress}
                onDelete={deleteGoal}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
