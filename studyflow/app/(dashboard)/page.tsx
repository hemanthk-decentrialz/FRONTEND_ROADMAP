"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Dashboard from "@/components/dashboard/Dashboard";
import useAuth from "@/hooks/useAuth";

export default function HomePage() {
  const router = useRouter();

  const {
    isAuthenticated,
    isReady,
  } = useAuth();

  useEffect(() => {
    if (
      isReady &&
      !isAuthenticated
    ) {
      router.replace("/login");
    }
  }, [
    isReady,
    isAuthenticated,
    router,
  ]);

  if (!isReady) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-muted">
          Loading...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Dashboard />;
}