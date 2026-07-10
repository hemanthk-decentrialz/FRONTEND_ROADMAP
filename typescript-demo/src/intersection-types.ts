// Intersection Types
console.log("\n=== Intersection Types ===");

type Name = { name: string };
type Age = { age: number };
type Person = Name & Age;

const person: Person = {
    name: "Alice",
    age: 30
};

console.log(`Person: ${person.name}, ${person.age}`);