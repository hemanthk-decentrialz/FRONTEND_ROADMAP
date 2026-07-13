import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-300 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "gradient-primary text-white hover:-translate-y-0.5 hover:shadow-xl focus:ring-blue-300",

    secondary:
      "surface surface-hover focus:ring-slate-300",

    danger:
      "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:-translate-y-0.5 hover:shadow-xl hover:from-red-600 hover:to-rose-700 focus:ring-red-300",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}

      <span
        style={
          variant === "secondary"
            ? { color: "var(--foreground)" }
            : undefined
        }
      >
        {children}
      </span>
    </button>
  );
}