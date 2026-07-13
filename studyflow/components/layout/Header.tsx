"use client";

import { useMemo } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header
      className="glass sticky top-0 z-30 flex items-center justify-between border-b px-5 py-4 backdrop-blur-xl"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="icon-button rounded-xl p-3 transition lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} className="text-lg" />
        </button>

        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            {greeting}
          </h2>

          <p className="text-muted mt-1 text-sm">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="surface surface-hover flex items-center gap-3 rounded-2xl px-3 py-2">
          <div className="gradient-primary flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white">
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="hidden text-left md:block">
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {user?.name}
            </p>

            <p className="text-muted text-xs">
              {user?.email}
            </p>
          </div>

          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-muted hidden text-xs md:block"
          />
        </button>

        <button
          onClick={() => {
            logout();
            router.replace("/login");
          }}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
}