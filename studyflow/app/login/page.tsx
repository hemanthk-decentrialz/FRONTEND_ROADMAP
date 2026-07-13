"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/auth/LoginForm";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
      <LoginForm />
    </main>
  );
}