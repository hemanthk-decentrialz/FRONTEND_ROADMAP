import { NextRequest } from "next/server";

import {
  getUserData,
  resetUserStudyData,
  updateDb,
} from "@/lib/server/db";
import { failure, success } from "@/lib/server/response";
import { requireUser } from "@/lib/server/session";
import { StudyFlowSettings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/utils/settingsState";

function isSettings(
  value: unknown
): value is StudyFlowSettings {
  return (
    typeof value === "object" &&
    value !== null &&
    "theme" in value &&
    ((value as StudyFlowSettings).theme === "light" ||
      (value as StudyFlowSettings).theme === "dark")
  );
}

export async function GET(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  return success(
    getUserData(session.db, session.user.id).settings
  );
}

export async function PUT(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  const body = (await request.json().catch(() => null)) as
    | { settings?: unknown }
    | null;

  if (!body || !isSettings(body.settings)) {
    return failure(
      "Settings payload must include a valid settings object.",
      422
    );
  }

  const nextSettings = body.settings;

  const settings = await updateDb((db) => {
    const userData = getUserData(db, session.user.id);
    userData.settings = {
      ...DEFAULT_SETTINGS,
      ...nextSettings,
    };

    return userData.settings;
  });

  return success(settings, "Settings saved.");
}

export async function DELETE(request: NextRequest) {
  const session = await requireUser(request);

  if ("error" in session) {
    return session.error;
  }

  await updateDb((db) => {
    resetUserStudyData(db, session.user.id);
  });

  return success(
    { reset: true },
    "Study data reset."
  );
}
