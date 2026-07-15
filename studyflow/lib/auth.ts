import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "./storage";

import {
  User,
  SessionUser,
} from "@/types/auth";

const USERS_KEY = "studyflow-users";

const SESSION_KEY = "studyflow-session";

type LegacyUser = Omit<User, "passwordHash"> & {
  passwordHash?: string;
  password?: string;
};

export function getUsers(): LegacyUser[] {
  return getStorageItem<LegacyUser[]>(
    USERS_KEY,
    []
  );
}

export function saveUsers(
  users: LegacyUser[]
) {
  setStorageItem(
    USERS_KEY,
    users
  );
}

export function getSession():
  | SessionUser
  | null {
  return getStorageItem<
    SessionUser | null
  >(
    SESSION_KEY,
    null
  );
}

export function saveSession(
  user: SessionUser
) {
  setStorageItem(
    SESSION_KEY,
    user
  );
}

export function clearSession() {
  removeStorageItem(
    SESSION_KEY
  );
}

export async function hashPassword(
  password: string
): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) =>
      byte.toString(16).padStart(2, "0")
    )
    .join("");
}

export async function verifyPassword(
  user: LegacyUser,
  password: string
): Promise<boolean> {
  const legacyPassword =
    (user as LegacyUser).password;

  if (
    !user.passwordHash &&
    legacyPassword === password
  ) {
    const migratedUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash:
        await hashPassword(password),
    };

    saveUsers(
      getUsers().map((storedUser) =>
        storedUser.id === user.id
          ? migratedUser
          : storedUser
      )
    );

    return true;
  }

  return user.passwordHash ===
    await hashPassword(password);
}

export function findUserByEmail(
  email: string
) {
  return getUsers().find(
    (user) =>
      user.email.toLowerCase() ===
      email.toLowerCase()
  );
}

export function registerUser(
  user: User
) {
  const users = getUsers();

  users.push(user);

  saveUsers(users);
}
