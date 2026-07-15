import Card from "@/components/ui/Card";
import { quotes } from "@/data/quotes";
import { getGreeting } from "@/utils/greetings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faBullseye,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

interface WelcomeCardProps {
  completedPlanner: number;
  plannerCount: number;
  activeGoalTitle: string;
  completedSessions: number;
}

export default function WelcomeCard({
  completedPlanner,
  plannerCount,
  activeGoalTitle,
  completedSessions,
}: WelcomeCardProps) {
  const today = new Date().getDate();
  const greeting = getGreeting();
  const quote = quotes[today % quotes.length];

  return (
    <Card className="overflow-hidden p-0">
      <div className="gradient-primary relative overflow-hidden rounded-3xl p-8 text-white">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

        <div className="absolute -bottom-16 right-20 h-28 w-28 rounded-full bg-white/5" />

        <div className="relative z-10">
          <p className="text-white/80">
            Welcome to StudyFlow
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl" suppressHydrationWarning>
            {greeting}
          </h1>

          <p className="mt-4 max-w-2xl text-white/85">
            Stay consistent, complete your goals, and keep
            improving every single day.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: faFire,
                title: "Planner",
                value: `${completedPlanner}/${plannerCount} Done`,
              },
              {
                icon: faBullseye,
                title: "Active Goal",
                value: activeGoalTitle,
              },
              {
                icon: faBookOpen,
                title: "Focus",
                value: `${completedSessions} Sessions`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/15 p-4 backdrop-blur-md transition hover:bg-white/20"
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-2xl"
                  />

                  <div>
                    <p className="text-sm text-white/80">
                      {item.title}
                    </p>

                    <h3 className="text-xl font-bold">
                      {item.value}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            <p className="text-lg italic leading-relaxed text-white/90" suppressHydrationWarning>
              &quot;{quote}&quot;
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
