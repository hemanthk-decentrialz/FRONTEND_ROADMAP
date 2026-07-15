export function getStorageItem<T>(
  key: string,
  defaultValue: T
): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return defaultValue;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(
      `Failed to read "${key}" from localStorage:`,
      error
    );

    localStorage.removeItem(key);

    return defaultValue;
  }
}

export function setStorageItem<T>(
  key: string,
  value: T
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      `Failed to save "${key}" to localStorage:`,
      error
    );
  }
}

export function removeStorageItem(
  key: string
): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(key);
}

export function clearStorage(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.clear();
}