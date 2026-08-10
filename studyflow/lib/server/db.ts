import { promises as fs } from "fs";
import path from "path";
import { Goal } from "@/types/goal";
import { Note } from "@/types/note";
import { StudySession } from "@/types/planner";
import { TimerState } from "@/types/timer";
import { User } from "@/types/auth";
import { StudyFlowSettings } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/utils/settingsState";
import { DEFAULT_TIMER_STATE } from "@/utils/timerState";

interface UserData {
  planner: StudySession[];
  notes: Note[];
  goals: Goal[];
  timer: TimerState;
  settings: StudyFlowSettings;
}

export interface StudyFlowDb {
  users: User[];
  data: Record<string, UserData>;
}

const dbDirectory = path.join(process.cwd(), ".studyflow-data");
const dbPath = path.join(dbDirectory, "db.json");

const emptyDb: StudyFlowDb = {
  users: [],
  data: {},
};

let writeQueue = Promise.resolve();

function createUserData(): UserData {
  return {
    planner: [],
    notes: [],
    goals: [],
    timer: DEFAULT_TIMER_STATE,
    settings: DEFAULT_SETTINGS,
  };
}

async function ensureDbFile() {
  await fs.mkdir(dbDirectory, { recursive: true });

  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(
      dbPath,
      JSON.stringify(emptyDb, null, 2),
      "utf8"
    );
  }
}

export async function readDb(): Promise<StudyFlowDb> {
  await ensureDbFile();

  try {
    const raw = await fs.readFile(dbPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<StudyFlowDb>;

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      data: parsed.data ?? {},
    };
  } catch {
    return emptyDb;
  }
}

export async function writeDb(db: StudyFlowDb) {
  writeQueue = writeQueue.then(async () => {
    await ensureDbFile();
    await fs.writeFile(
      dbPath,
      JSON.stringify(db, null, 2),
      "utf8"
    );
  });

  return writeQueue;
}

export async function updateDb<T>(
  updater: (db: StudyFlowDb) => T
) {
  const db = await readDb();
  const result = updater(db);

  await writeDb(db);

  return result;
}

export function getUserData(
  db: StudyFlowDb,
  userId: string
) {
  if (!db.data[userId]) {
    db.data[userId] = createUserData();
  }

  db.data[userId] = {
    ...createUserData(),
    ...db.data[userId],
    settings: {
      ...DEFAULT_SETTINGS,
      ...db.data[userId].settings,
    },
  };

  return db.data[userId];
}

export function resetUserStudyData(
  db: StudyFlowDb,
  userId: string
) {
  const currentData = getUserData(db, userId);

  db.data[userId] = {
    ...createUserData(),
    settings: currentData.settings,
  };

  return db.data[userId];
}
