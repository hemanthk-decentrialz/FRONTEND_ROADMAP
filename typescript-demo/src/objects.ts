// Objects
console.log("\n=== Objects ===");

let person: { name: string; age: number } = {
    name: "Alice",
    age: 30
};

console.log(`Person: ${person.name}, ${person.age}`);

let config: { 
    url: string; 
    timeout?: number; 
    retries?: number 
} = {
    url: "https://api.example.com",
    timeout: 5000
};

console.log(`Config: ${config.url}, timeout: ${config.timeout}`);