import Card from "@/components/ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: IconDefinition;
  color: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color,
}: StatsCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-30 transition-transform duration-500 group-hover:scale-125"
        style={{
          background: "var(--border)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-muted text-sm font-medium">
            {title}
          </p>

          <h2
            className="mt-3 text-4xl font-extrabold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2">
            <span
              className="rounded-full px-2 py-1 text-xs font-semibold"
              style={{
                background: "rgba(34,197,94,.12)",
                color: "#16a34a",
              }}
            >
              ↑ 12%
            </span>

            <span className="text-muted text-xs">
              vs last week
            </span>
          </div>
        </div>

        <div
          className={`${color} flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}
        >
          <FontAwesomeIcon
            icon={icon}
            className="text-2xl"
          />
        </div>
      </div>

      <div className="mt-6">
        <div
          className="h-2 overflow-hidden rounded-full"
          style={{ background: "var(--border)" }}
        >
          <div
            className={`${color} h-full rounded-full transition-all duration-700`}
            style={{ width: "75%" }}
          />
        </div>
      </div>
    </Card>
  );
}