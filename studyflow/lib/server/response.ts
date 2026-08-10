import { NextResponse } from "next/server";

import { ApiFailure, ApiSuccess } from "@/types/api";

export function success<T>(
  data: T,
  message?: string,
  status = 200
) {
  const body: ApiSuccess<T> = {
    ok: true,
    data,
    ...(message ? { message } : {}),
  };

  return NextResponse.json(body, { status });
}

export function failure(
  error: string,
  status = 400,
  details?: string[]
) {
  const body: ApiFailure = {
    ok: false,
    error,
    ...(details ? { details } : {}),
  };

  return NextResponse.json(body, { status });
}
