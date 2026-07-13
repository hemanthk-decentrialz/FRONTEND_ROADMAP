// Enums
console.log("\n=== Enums ===");

enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

enum Status {
    Pending = 1,
    Approved = 2,
    Rejected = 3
}

enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

console.log(`Direction.Up: ${Direction.Up}`);
console.log(`Status.Approved: ${Status.Approved}`);
console.log(`Color.Red: ${Color.Red}`);