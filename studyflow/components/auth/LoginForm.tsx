"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {
  findUserByEmail,
  verifyPassword,
} from "@/lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faGraduationCap} from "@fortawesome/free-solid-svg-icons";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError(
        "Please enter your email."
      );
      return;
    }
    if (!password.trim()) {
      setError(
        "Please enter your password."
      );
      return;
    }
    const user = findUserByEmail(trimmedEmail);
    if (!user) {
      setError(
        "No account found with this email."
      );
      return;
    }
    if (!(await verifyPassword(user, password))) {
      setError(
        "Incorrect password."
      );
      return;
    }
    login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    router.replace("/");
  }
  return (
    <div className="w-full max-w-md rounded-3xl bg-(--card) p-8 shadow-2xl">
      <div className="mb-8 text-center"> {/* Logo */}
        <div className="gradient-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white">
          <FontAwesomeIcon icon={faGraduationCap} className="text-3xl"/>
        </div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)",}}>
          Welcome Back
        </h1>
        <p className="text-muted mt-2">
          Login to continue using StudyFlow.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Email
          </label>
          <input type="email" placeholder="Enter your email" value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            } className="input-theme w-full rounded-xl px-4 py-3"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Password
          </label>
          <div className="relative">
            <input type={ showPassword ? "text" : "password" } placeholder="Enter password" value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              } className="input-theme w-full rounded-xl px-4 py-3 pr-12"
            />
            <button type="button"
              onClick={() =>
                setShowPassword(
                  (previous) =>
                    !previous
                )
              } className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
            >
              <FontAwesomeIcon icon={ showPassword ? faEyeSlash : faEye}/>
            </button>
          </div>
        </div>
        {error && (
          <p className="text-sm font-medium text-red-500">
            {error}
          </p>
        )}
        <button type="submit" className="gradient-primary w-full rounded-xl py-3 font-semibold text-white transition hover:opacity-90">
          Login
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-muted text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
