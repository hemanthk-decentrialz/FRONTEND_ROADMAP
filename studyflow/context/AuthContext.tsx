"use client";

import { createContext, useCallback, useEffect, useContext, useMemo, useState, useSyncExternalStore, ReactNode } from "react";
import { getSession, saveSession, clearSession } from "@/lib/auth";
import { getCurrentUser, logout as logoutRequest } from "@/lib/api/auth";
import { isUnauthorizedApiError, setConfirmedSessionUserId } from "@/lib/api/client";
import { SessionUser } from "@/types/auth";

interface AuthContextType {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    user: SessionUser
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
type SessionSnapshot = SessionUser | null| undefined;
const sessionListeners = new Set<() => void>();
const SESSION_KEY = "studyflow-session";
let cachedSessionRaw: string | null | undefined = undefined;
let cachedSessionSnapshot: SessionSnapshot = undefined;

function getSessionSnapshot(): SessionSnapshot {
  const raw = localStorage.getItem(SESSION_KEY);
  if (raw === cachedSessionRaw) {
    return cachedSessionSnapshot;
  }
  cachedSessionRaw = raw;
  cachedSessionSnapshot = getSession();
  return cachedSessionSnapshot;
}

function subscribeToSession( listener: () => void) {
  sessionListeners.add(listener);
  function handleStorage( event: StorageEvent ) {
    if ( event.key === SESSION_KEY ) {
      listener();
    }
  }
  window.addEventListener( "storage", handleStorage );
  return () => {
    sessionListeners.delete(listener);
    window.removeEventListener( "storage", handleStorage );
  };
}

function notifySessionChange() {
  sessionListeners.forEach((listener) => listener());
}

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const session = useSyncExternalStore<SessionSnapshot>( subscribeToSession, getSessionSnapshot, () => undefined );
  const user = session ?? null;
  const isLoading =
    session === undefined ||
    isRestoringSession;

  const logout = useCallback(() => {
    logoutRequest().catch(() => undefined);
    setConfirmedSessionUserId(null);
    clearSession();
    notifySessionChange();
  }, []);

  useEffect(() => {
    let isActive = true;

    async function restoreSessionFromCookie() {
      try {
        const restoredUser = await getCurrentUser();

        if (isActive) {
          setConfirmedSessionUserId(restoredUser.id);
          saveSession(restoredUser);
          notifySessionChange();
        }
      } catch (error) {
        if (isActive) {
          setConfirmedSessionUserId(null);
          clearSession();
          notifySessionChange();
        }

        if (!isUnauthorizedApiError(error)) {
          console.error(
            "Failed to restore session from API:",
            error
          );
        }
       } finally {
        if (isActive) {
          setIsRestoringSession(false);
        }
      }
    }
    restoreSessionFromCookie();
    return () => {
      isActive = false;
    };
  }, []);
  const login = useCallback(async (user: SessionUser) => {
    setIsRestoringSession(true);

    try {
      const confirmedUser = await getCurrentUser();

      if (confirmedUser.id !== user.id) {
        throw new Error("Login session could not be verified.");
      }

      setConfirmedSessionUserId(confirmedUser.id);
      saveSession(confirmedUser);
      notifySessionChange();
    } catch (error) {
      setConfirmedSessionUserId(null);
      clearSession();
      notifySessionChange();
      throw error;
    } finally {
      setIsRestoringSession(false);
    }
  }, []);

  const value = useMemo(() => ({
      user, isLoading, isAuthenticated: user !== null,
      login, logout,
    }), [user, isLoading, login, logout]
  );
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider."
    );
  }
  return context;
}
