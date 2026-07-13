// Math Module
export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

export function divide(a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}

export default function calculate(a: number, b: number, operation: string): number {
    switch(operation) {
        case 'add': return a + b;
        case 'subtract': return a - b;
        case 'multiply': return a * b;
        case 'divide': return a / b;
        default: throw new Error('Invalid operation');
    }
}

export interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}