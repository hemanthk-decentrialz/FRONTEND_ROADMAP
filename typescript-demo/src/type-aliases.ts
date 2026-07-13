// Type Aliases
console.log("\n=== Type Aliases ===");

type Point = {
    x: number;
    y: number;
};

let point: Point = { x: 10, y: 20 };
console.log(`Point: (${point.x}, ${point.y})`);

type ID = string | number;
let userId: ID = 123;
console.log(`User ID: ${userId}`);
userId = "user123";
console.log(`User ID (string): ${userId}`);