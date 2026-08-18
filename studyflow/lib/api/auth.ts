import { apiRequest } from "@/lib/api/client";
import { SessionUser } from "@/types/auth";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export function signup(payload: SignupPayload) {
  return apiRequest<SessionUser>("/api/auth/signup", {
    method: "POST",
    body: payload,
  });
}

export function login(payload: LoginPayload) {
  return apiRequest<SessionUser>("/api/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function getCurrentUser() {
  return apiRequest<SessionUser>("/api/auth/me", {
    includeSessionHeader: false,
  });
}

export function logout() {
  return apiRequest<{ loggedOut: true }>("/api/auth/logout", {
    method: "POST",
  });
}
