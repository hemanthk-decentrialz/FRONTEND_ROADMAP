"use client";

import { useEffect, useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import TimerCompletionNotifier from "@/components/timer/TimerCompletionNotifier";
import TimerTicker from "@/components/timer/TimerTicker";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Sidebar */}

      <div className="shrink-0 lg:sticky lg:top-0 lg:h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Mobile Overlay */}

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Content */}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main
          className="page-container flex-1 overflow-y-auto p-6 lg:p-8"
        >
          {children}
        </main>
      </div>

      <TimerTicker />
      <TimerCompletionNotifier />
    </div>
  );
}
