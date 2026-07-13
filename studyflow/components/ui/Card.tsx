import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export default function Card({
  children,
  title,
  subtitle,
  icon,
  className = "",
}: CardProps) {
  return (
    <div className={`dashboard-card p-6 ${className}`}>
      {(title || subtitle || icon) && (
        <div className="mb-5 flex items-start justify-between">
          <div>
            {title && (
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-muted mt-1 text-sm">
                {subtitle}
              </p>
            )}
          </div>

          {icon && (
            <div
              className="icon-surface">
              {icon}
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
}