// Optional Parameters
console.log("\n=== Optional Parameters ===");

function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));
console.log(greet("Bob", "Hi"));

function createUser(name: string, age?: number): { name: string; age?: number } {
    const user: { name: string; age?: number } = { name };
    if (age !== undefined) {
        user.age = age;
    }
    return user;
}

console.log(createUser("Alice"));
console.log(createUser("Bob", 25));