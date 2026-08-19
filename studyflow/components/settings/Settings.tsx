"use client";

import { useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import useUserLocalStorage from "@/hooks/useUserLocalStorage";
import { resetStudyData } from "@/lib/api/settings";
import { StudyFlowSettings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/utils/settingsState";
import { faMoon, faSun, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getInitialSettings(): StudyFlowSettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  return {
    ...DEFAULT_SETTINGS,
    theme:
      localStorage.getItem("theme") === '"dark"'
        ? "dark"
        : "light",
  };
}

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] =
    useUserLocalStorage<StudyFlowSettings>(
      "settings",
      getInitialSettings()
    );
  const theme = settings.theme;

  useEffect(() => {
    document.documentElement.classList.remove(
      "light",
      "dark"
    );

    document.documentElement.classList.add(theme);
    localStorage.setItem(
      "theme",
      JSON.stringify(theme)
    );
  }, [theme]);

  function toggleTheme() {
    setSettings((previous) => ({
      ...previous,
      theme:
        previous.theme === "light"
          ? "dark"
          : "light",
    }));
  }

  async function resetApplication() {
    if (
      confirm(
        "Delete your saved StudyFlow data?"
      )
    ) {
      try {
        await resetStudyData();
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Unable to reset your data."
        );
        return;
      }

      if (user) {
        Object.keys(localStorage)
          .filter((key) =>
            key.startsWith(`user:${user.id}:`)
          )
          .forEach((key) =>
            localStorage.removeItem(key)
          );
      }

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
                Remove your saved planner,
                notes, goals and timer data.
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
