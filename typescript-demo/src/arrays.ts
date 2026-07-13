// Arrays
console.log("\n=== Arrays ===");

let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let mixed: (string | number)[] = ["hello", 42, "world"];

console.log(`Number array: ${list1}`);
console.log(`Array generic: ${list2}`);
console.log(`Mixed array: ${mixed}`);

let numbers: number[] = [10, 20, 30, 40];
const doubled: number[] = numbers.map((num: number): number => num * 2);
console.log(`Doubled: ${doubled}`);