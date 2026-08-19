"use client";

import WelcomeCard from "./WelcomeCard";
import StatsCard from "./StatsCard";
import useDashboardData from "@/hooks/useDashboardData";
import FullPageLoader from "@/components/ui/FullPageLoader";
import { faBook, faNoteSticky, faBullseye, faClock} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const { summary, isLoading } = useDashboardData();

  if (isLoading || !summary) {
    return <FullPageLoader label="Loading your dashboard..." />;
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 animate-fade pb-12 lg:pb-16">
      <WelcomeCard
        completedPlanner={summary.completedPlanner}
        plannerCount={summary.plannerCount}
        activeGoalTitle={summary.activeGoalTitle}
        completedSessions={summary.totalSessions}
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
            {summary.completionRate}% Goals Completed
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Study Sessions"
            value={summary.plannerCount}
            icon={faBook}
            color="gradient-primary"
            detail={`${summary.completedPlanner} completed`}
            progress={summary.plannerCompletionRate}
          />

          <StatsCard
            title="Notes"
            value={summary.totalNotes}
            icon={faNoteSticky}
            color="gradient-success"
            detail="Saved notes"
          />

          <StatsCard
            title="Goals"
            value={summary.totalGoals}
            icon={faBullseye}
            color="gradient-warning"
            detail={`${summary.completedGoals} completed`}
            progress={summary.completionRate}
          />

          <StatsCard
            title="Pomodoro Sessions"
            value={summary.totalSessions}
            icon={faClock}
            color="gradient-danger"
            detail="Focus sessions"
          />
        </div>
      </section>
    </main>
  );
}
