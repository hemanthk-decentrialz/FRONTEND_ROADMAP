import { ApiResponse } from "@/types/api";

let confirmedSessionUserId: string | null = null;

export function setConfirmedSessionUserId(
  userId: string | null
) {
  confirmedSessionUserId = userId;
}

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  includeSessionHeader?: boolean;
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
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
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

  if (
    options.includeSessionHeader !== false &&
    confirmedSessionUserId
  ) {
    headers["x-user-id"] = confirmedSessionUserId;
  }

  const response = await fetch(endpoint, {
    method: options.method ?? "GET",
    headers,
    credentials: "include",
    cache: "no-store",
    body:
      options.body === undefined
        ? undefined
        : JSON.stringify(options.body),
  });

  const payload = (await response
    .json()
    .catch(() => ({
      ok: false,
      error: `API request failed with status ${response.status}.`,
    }))) as ApiResponse<T>;

  if (!payload.ok) {
    throw new ApiRequestError(
      payload.error,
      response.status
    );
  }

  return payload.data;
}
