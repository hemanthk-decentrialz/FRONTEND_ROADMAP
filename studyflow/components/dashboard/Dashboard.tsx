"use client";

import WelcomeCard from "./WelcomeCard";
import StatsCard from "./StatsCard";
import useDashboardData from "@/hooks/useDashboardData";
import { faBook, faNoteSticky, faBullseye, faClock} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const {
    planner,
    notes,
    goals,
    timer,
    completedGoals,
    completionRate,
    completedPlanner,
  } = useDashboardData();
  const plannerCompletion =
    planner.length === 0
      ? 0
      : Math.round(
          (completedPlanner / planner.length) * 100
        );
  const activeGoalTitle =
    goals.find((goal) => goal.progress < 100)?.title ??
    "No active goals";

  return (
    <main className="mx-auto max-w-7xl space-y-8 animate-fade pb-12 lg:pb-16">
      <WelcomeCard
        completedPlanner={completedPlanner}
        plannerCount={planner.length}
        activeGoalTitle={activeGoalTitle}
        completedSessions={timer.completedSessions}
      />
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Dashboard Overview
            </h2>
            <p className="text-muted mt-1 text-sm">
              Your productivity at a glance.
            </p>
          </div>
          <span
            className="rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              background: "rgba(37,99,235,.12)",
              color: "var(--primary)",
            }}
          >
            {completionRate}% Goals Completed
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Study Sessions"
            value={planner.length}
            icon={faBook}
            color="gradient-primary"
            detail={`${completedPlanner} completed`}
            progress={plannerCompletion}
          />

          <StatsCard
            title="Notes"
            value={notes.length}
            icon={faNoteSticky}
            color="gradient-success"
            detail="Saved notes"
          />

          <StatsCard
            title="Goals"
            value={goals.length}
            icon={faBullseye}
            color="gradient-warning"
            detail={`${completedGoals} completed`}
            progress={completionRate}
          />

          <StatsCard
            title="Pomodoro Sessions"
            value={timer.completedSessions}
            icon={faClock}
            color="gradient-danger"
            detail="Focus sessions"
          />
        </div>
      </section>

    </main>
  );
}
