import { ApiResponse } from "@/types/api";

const SESSION_KEY = "studyflow-session";

function getSessionUserId() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(SESSION_KEY);

    if (!raw) {
      return null;
    }

    const session = JSON.parse(raw) as {
      id?: string;
    };

    return session.id ?? null;
  } catch {
    return null;
  }
}

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
}

export class ApiRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

export function isUnauthorizedApiError(error: unknown) {
  return (
    error instanceof ApiRequestError &&
    error.status === 401
  );
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (options.auth !== false) {
    const userId = getSessionUserId();

    if (userId) {
      headers["x-user-id"] = userId;
    }
  }

  const response = await fetch(endpoint, {
    method: options.method ?? "GET",
    headers,
    credentials: "same-origin",
    cache: "no-store",
    body:
      options.body === undefined
        ? undefined
        : JSON.stringify(options.body),
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!payload.ok) {
    throw new ApiRequestError(
      payload.error,
      response.status
    );
  }

  return payload.data;
}
