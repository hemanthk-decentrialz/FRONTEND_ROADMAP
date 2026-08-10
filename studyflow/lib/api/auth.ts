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
    auth: false,
  });
}

export function login(payload: LoginPayload) {
  return apiRequest<SessionUser>("/api/auth/login", {
    method: "POST",
    body: payload,
    auth: false,
  });
}
