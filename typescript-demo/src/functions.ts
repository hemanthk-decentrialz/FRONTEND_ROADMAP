// Functions
console.log("\n=== Functions ===");

function add(x: number, y: number): number {
    return x + y;
}

const multiply = (x: number, y: number): number => x * y;

console.log(`Add: ${add(10, 5)}`);
console.log(`Multiply: ${multiply(10, 5)}`);

function sumAll(...numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(`Sum: ${sumAll(1, 2, 3, 4, 5)}`);