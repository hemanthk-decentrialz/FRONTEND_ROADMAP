export function isEmpty(value : string) : boolean {
    return value.trim().length === 0;
}

export function isValidCgpa(cgpa: number): boolean {
    return cgpa >= 0 && cgpa <= 10;
}
