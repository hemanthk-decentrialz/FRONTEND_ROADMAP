"use client";

import { useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  faMoon,
  faSun,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Settings() {
  const [theme, setTheme] =
    useLocalStorage<"light" | "dark">(
      "theme",
      "light"
    );

  useEffect(() => {
    document.documentElement.classList.remove(
      "light",
      "dark"
    );

    document.documentElement.classList.add(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((previous) =>
      previous === "light"
        ? "dark"
        : "light"
    );
  }

  function resetApplication() {
    if (
      confirm(
        "Delete all StudyFlow data?"
      )
    ) {
      localStorage.clear();
      location.reload();
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2
          className="mb-6 text-3xl font-bold"
          style={{
            color: "var(--foreground)",
          }}
        >
          Settings
        </h2>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3
              className="text-xl font-semibold"
              style={{
                color: "var(--foreground)",
              }}
            >
              Theme
            </h3>

            <p className="text-muted">
              Switch between Light and Dark Mode.
            </p>
          </div>

          <Button
            className="w-auto"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={
                theme === "light"
                  ? faMoon
                  : faSun
              }
              className="mr-2"
            />

            {theme === "light"
              ? "Dark Mode"
              : "Light Mode"}
          </Button>
        </div>

        <div
          className="border-t pt-8"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className="text-xl font-semibold"
                style={{
                  color:
                    "var(--foreground)",
                }}
              >
                Reset Application
              </h3>

              <p className="text-muted">
                Remove every saved planner,
                notes, goals and timer.
              </p>
            </div>

            <Button
              variant="danger"
              className="w-auto"
              onClick={resetApplication}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="mr-2"
              />

              Reset
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}