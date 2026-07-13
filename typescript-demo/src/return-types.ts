// Return Types
console.log("\n=== Return Types ===");

function addNumbers(a: number, b: number): number {
    return a + b;
}

function logMessage(message: string): void {
    console.log(`Log: ${message}`);
}

function getUser(): { id: number; name: string } {
    return { id: 1, name: "John" };
}

console.log(`Add: ${addNumbers(10, 5)}`);
logMessage("This is a test");
console.log(`User: ${getUser().name}`);