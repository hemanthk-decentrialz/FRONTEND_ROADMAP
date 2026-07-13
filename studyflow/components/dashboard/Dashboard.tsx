"use client";

import WelcomeCard from "./WelcomeCard";
import StatsCard from "./StatsCard";
import useDashboardData from "@/hooks/useDashboardData";
import { faBook, faNoteSticky, faBullseye, faClock} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const { planner, notes, goals, timer, completedGoals, completionRate } = useDashboardData();

  return (
    <main className="mx-auto max-w-7xl space-y-8 animate-fade">
      <WelcomeCard />
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
          />

          <StatsCard
            title="Notes"
            value={notes.length}
            icon={faNoteSticky}
            color="gradient-success"
          />

          <StatsCard
            title="Goals"
            value={goals.length}
            icon={faBullseye}
            color="gradient-warning"
          />

          <StatsCard
            title="Pomodoro Sessions"
            value={timer.completedSessions}
            icon={faClock}
            color="gradient-danger"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="dashboard-card p-6">
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Study Planner
          </h3>

          <p className="text-muted mt-2 text-sm">
            Total Sessions
          </p>

          <h1
            className="mt-3 text-4xl font-extrabold"
            style={{ color: "var(--foreground)" }}
          >
            {planner.length}
          </h1>
        </div>

        <div className="dashboard-card p-6">
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Goal Progress
          </h3>

          <p className="text-muted mt-2 text-sm">
            Completed Goals
          </p>

          <h1
            className="mt-3 text-4xl font-extrabold"
            style={{ color: "var(--foreground)" }}
          >
            {completedGoals}
          </h1>
        </div>

        <div className="dashboard-card p-6">
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Focus Sessions
          </h3>

          <p className="text-muted mt-2 text-sm">
            Completed Today
          </p>

          <h1
            className="mt-3 text-4xl font-extrabold"
            style={{ color: "var(--foreground)" }}
          >
            {timer.completedSessions}
          </h1>
        </div>
      </section>
    </main>
  );
}