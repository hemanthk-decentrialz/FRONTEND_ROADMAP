// Tuples
console.log("\n=== Tuples ===");

let user: [string, number, boolean] = ["Alice", 25, true];
console.log(`User: ${user[0]}, ${user[1]}, ${user[2]}`);

const [name, age, isActive] = user;
console.log(`Destructured: ${name}, ${age}, ${isActive}`);