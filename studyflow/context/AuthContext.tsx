"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  ReactNode,
} from "react";

import {
  getSession,
  saveSession,
  clearSession,
} from "@/lib/auth";

import {
  SessionUser,
} from "@/types/auth";

interface AuthContextType {
  user: SessionUser | null;

  isLoading: boolean;

  isAuthenticated: boolean;

  login: (
    user: SessionUser
  ) => void;

  logout: () => void;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

type SessionSnapshot =
  | SessionUser
  | null
  | undefined;

const sessionListeners =
  new Set<() => void>();

const SESSION_KEY = "studyflow-session";

let cachedSessionRaw:
  | string
  | null
  | undefined = undefined;

let cachedSessionSnapshot:
  SessionSnapshot = undefined;

function getSessionSnapshot():
  SessionSnapshot {
  const raw =
    localStorage.getItem(SESSION_KEY);

  if (raw === cachedSessionRaw) {
    return cachedSessionSnapshot;
  }

  cachedSessionRaw = raw;
  cachedSessionSnapshot = getSession();

  return cachedSessionSnapshot;
}

function subscribeToSession(
  listener: () => void
) {
  sessionListeners.add(listener);

  function handleStorage(
    event: StorageEvent
  ) {
    if (
      event.key ===
      SESSION_KEY
    ) {
      listener();
    }
  }

  window.addEventListener(
    "storage",
    handleStorage
  );

  return () => {
    sessionListeners.delete(listener);
    window.removeEventListener(
      "storage",
      handleStorage
    );
  };
}

function notifySessionChange() {
  sessionListeners.forEach((listener) =>
    listener()
  );
}

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const session =
    useSyncExternalStore<
      SessionSnapshot
    >(
      subscribeToSession,
      getSessionSnapshot,
      () => undefined
    );

  const user = session ?? null;
  const isLoading =
    session === undefined;

  function login(
    user: SessionUser
  ) {
    saveSession(user);

    notifySessionChange();
  }

  function logout() {
    clearSession();

    notifySessionChange();
  }

  const value = useMemo(
    () => ({
      user,

      isLoading,

      isAuthenticated:
        user !== null,

      login,

      logout,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider."
    );
  }

  return context;
}
