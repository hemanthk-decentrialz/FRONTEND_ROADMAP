"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCalendarDays, faNoteSticky, faClock, faBullseye, faGear, faXmark, faGraduationCap, faCircle} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: "Dashboard", href: "/", icon: faHouse },
  { title: "Planner", href: "/planner", icon: faCalendarDays },
  { title: "Notes", href: "/notes", icon: faNoteSticky },
  { title: "Timer", href: "/timer", icon: faClock },
  { title: "Goals", href: "/goals", icon: faBullseye },
  { title: "Settings", href: "/settings", icon: faGear },
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;

      if (isOpen) {
        onClose();
      }
    }
  }, [isOpen, onClose, pathname]);

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-80 max-w-[90vw] flex-col border-r transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "var(--card)", color: "var(--foreground)", borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
      >
        {/* Logo */}
        <div className="border-b p-6" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <Link href="/" onClick={onClose}
              className="flex items-center gap-4 rounded-2xl transition hover:opacity-90"
              aria-label="Go to dashboard"
            >
              <div className="gradient-primary flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg">
                <FontAwesomeIcon icon={faGraduationCap} className="text-2xl"/>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wide" style={{ color: "var(--foreground)" }}>
                  StudyFlow
                </h1>
                <p className="text-muted text-sm" suppressHydrationWarning>
                  {user?.email}
                </p>
              </div>
            </Link>
            <button onClick={onClose} aria-label="Close Sidebar" className="icon-button rounded-xl p-2">
              <FontAwesomeIcon icon={faXmark} className="text-xl"/>
            </button>
          </div>
        </div>
        {/* Welcome */}
        <div className="gradient-primary mx-5 mt-6 rounded-2xl p-5 text-white shadow-lg">
          <p className="text-sm text-white/80">
            Welcome back
          </p>
          <h2 className="mt-1 text-xl font-bold" suppressHydrationWarning>
            {user?.name}
          </h2>
          <p className="mt-2 text-xs text-white/80">
            Keep building something amazing today.
          </p>
        </div>
        {/* Navigation */}
        <nav className="mt-8 flex-1 overflow-y-auto px-4">
          <p className="text-muted mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em]">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={onClose}
                className={`group mb-3 flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300
                  ${
                    active
                      ? "gradient-primary text-white shadow-lg"
                      : "surface-hover hover:translate-x-1"
                  }`}
                style={ active ? { background: "var(--primary)", color: "#fff", boxShadow: "var(--shadow)" } : {} }
              >
                <FontAwesomeIcon icon={item.icon}
                  className={`w-5 transition-colors ${
                    active
                      ? "text-white"
                      : "text-blue-500 group-hover:text-blue-600"
                  }`}
                />
                <span className="font-medium">
                  {item.title}
                </span>
                {active && (
                  <FontAwesomeIcon icon={faCircle} className="ml-auto text-[8px]"/>
                )}
              </Link>
            );
          })}
        </nav>
        {/* Footer */}
        <div className="border-t p-5" style={{ borderColor: "var(--border)" }}>
          <div className="surface rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                  StudyFlow
                </p>
                <p className="text-muted text-xs">
                  Version 1.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
