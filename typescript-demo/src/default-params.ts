// Default Parameters
console.log("\n=== Default Parameters ===");

function greetDefault(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

console.log(greetDefault("Alice"));
console.log(greetDefault("Bob", "Hi"));

function createUserDefault(
    name: string,
    age: number = 18,
    isActive: boolean = true
): { name: string; age: number; isActive: boolean } {
    return { name, age, isActive };
}

console.log(createUserDefault("Alice"));
console.log(createUserDefault("Bob", 25));