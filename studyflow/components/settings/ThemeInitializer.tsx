"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    const theme =
      localStorage.getItem("theme") === '"dark"'
        ? "dark"
        : "light";

    document.documentElement.classList.remove(
      "light",
      "dark"
    );
    document.documentElement.classList.add(theme);
  }, []);

  return null;
}
