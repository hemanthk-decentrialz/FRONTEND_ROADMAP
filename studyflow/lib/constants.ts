export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const REQUEST_TIMEOUT = 10000;
export const STORAGE_KEYS = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
    USER: "user",
} as const;
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup",
        LOGOUT: "/auth/logout",
    },
    DASHBOARD: "/dashboard",
    NOTES: "/notes",
    PLANNER: "/planner",
    GOALS: "/goals",
    TIMER: {
        SESSION: "/timer/session",
        HISTORY: "/timer/history",
    },
    SETTINGS: "/settings",
} as const;