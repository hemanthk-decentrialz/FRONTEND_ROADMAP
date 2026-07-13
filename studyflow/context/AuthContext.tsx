"use client";

import {
  createContext,
  useContext,
  ReactNode,
} from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(
  null
);

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useLocalStorage<User | null>(
      "studyflow-user",
      null
    );

  function login(user: User) {
    setUser(user);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
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