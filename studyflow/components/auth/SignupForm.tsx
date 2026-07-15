"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  findUserByEmail,
  hashPassword,
  registerUser,
} from "@/lib/auth";
import { User } from "@/types/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faGraduationCap} from "@fortawesome/free-solid-svg-icons";

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  }
  async function handleSubmit( e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }
    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const existingUser = findUserByEmail(trimmedEmail);
    if (existingUser) {
      setError("An account already exists with this email.");
      return;
    }
    const newUser: User = {
      id: crypto.randomUUID(),
      name: trimmedName,
      email: trimmedEmail,
      passwordHash: await hashPassword(password),
    };
    registerUser(newUser);
    setSuccess("Account created successfully! Redirecting to Login...");
    window.setTimeout(() => {
      router.replace("/login");
    }, 1500);
  }
    return (
    <div className="w-full max-w-md rounded-3xl bg-(--card) p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <div className="gradient-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white">
          <FontAwesomeIcon icon={faGraduationCap} className="text-3xl"/>
        </div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)", }}>
          Create Account
        </h1>
        <p className="text-muted mt-2">
          Join StudyFlow and start managing your studies.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Full Name
          </label>
          <input type="text" value={name} placeholder="Enter your full name" onChange={(e) => setName(e.target.value)} className="input-theme w-full rounded-xl px-4 py-3"/>
        </div>
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Email
          </label>
          <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} className="input-theme w-full rounded-xl px-4 py-3"/>
        </div>
        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Password
          </label>
          <div className="relative">
            <input type={ showPassword ? "text" : "password"} value={password} placeholder="Minimum 8 characters" onChange={(e) => setPassword( e.target.value) } className="input-theme w-full rounded-xl px-4 py-3 pr-12"/>
            <button type="button" onClick={() => setShowPassword( (previous) => !previous)} className=" absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              <FontAwesomeIcon icon={ showPassword ? faEyeSlash : faEye}/>
            </button>
          </div>
        </div>
        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Confirm Password
          </label>
          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} placeholder="Confirm your password" onChange={(e) => setConfirmPassword(e.target.value)} className="input-theme w-full rounded-xl px-4 py-3 pr-12"/>
            <button type="button" onClick={() => setShowConfirmPassword((previous) => !previous)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye}/>
            </button>
          </div>
        </div>
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
            {success}
          </div>
        )}
        <button type="submit" className="gradient-primary w-full rounded-xl py-3 font-semibold text-white transition hover:opacity-90">
          Create Account
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-muted text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 transition hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
