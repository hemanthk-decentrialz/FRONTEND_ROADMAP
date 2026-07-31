export function identity<T>(value: T): T {
    return value;
}

export function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find((item) => item.id === id);
}
