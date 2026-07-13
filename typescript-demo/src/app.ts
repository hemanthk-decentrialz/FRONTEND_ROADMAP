// Using Math Module
import { add, subtract, multiply, divide } from './math.js';
import calculate from './math.js';

console.log("\n=== Module Examples ===");
console.log(`Add: ${add(10, 5)}`);
console.log(`Subtract: ${subtract(10, 5)}`);
console.log(`Multiply: ${multiply(10, 5)}`);
console.log(`Divide: ${divide(10, 5)}`);
console.log(`Calculate (multiply): ${calculate(10, 5, 'multiply')}`);