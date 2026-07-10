// Generics
console.log("\n=== Generics ===");

function identity<T>(arg: T): T {
    return arg;
}

console.log(`Identity string: ${identity<string>("hello")}`);
console.log(`Identity number: ${identity<number>(42)}`);

function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 30 });
console.log(`Merged: ${merged.name}, ${merged.age}`);