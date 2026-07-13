// Union Types
console.log("\n=== Union Types ===");

let value: string | number;
value = "hello";
console.log(`Value (string): ${value}`);
value = 42;
console.log(`Value (number): ${value}`);

function printId(id: number | string): void {
    console.log(`ID: ${id}`);
}
printId(123);
printId("abc123");