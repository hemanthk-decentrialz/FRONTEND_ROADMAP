"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Dashboard from "@/components/dashboard/Dashboard";
import useAuth from "@/hooks/useAuth";

export default function HomePage() {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <Dashboard />;
}