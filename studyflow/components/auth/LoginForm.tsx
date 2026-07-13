"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faGraduationCap} from "@fortawesome/free-solid-svg-icons";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit( e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    login({ id: crypto.randomUUID(), name, email });

    router.replace("/");
  }

  return (
    <div className="dashboard-card w-full max-w-md p-8">
      {/* Logo */}

      <div className="mb-8 text-center">
        <div className="gradient-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg">
          <FontAwesomeIcon icon={faGraduationCap} className="text-3xl"/>
        </div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>
          StudyFlow
        </h1>
        <p className="text-muted mt-2">
          Sign in to continue
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Full Name
          </label>
          <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="input-theme w-full rounded-xl px-4 py-3"/>
        </div>
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Email
          </label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-theme w-full rounded-xl px-4 py-3"/>
        </div>
        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Password
          </label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"}
              placeholder="Enter password" value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="input-theme w-full rounded-xl px-4 py-3 pr-12"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="icon-button absolute right-4 top-1/2 -translate-y-1/2"
            >
              <FontAwesomeIcon icon={ showPassword ? faEyeSlash : faEye}/>
            </button>
          </div>
        </div>
        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}
        {/* Submit */}
        <button type="submit" className="gradient-primary w-full rounded-xl py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
          Login
        </button>
      </form>
    </div>
  );
}