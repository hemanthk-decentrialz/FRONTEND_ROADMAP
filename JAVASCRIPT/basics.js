// ==================== BASICS + CONTROL STATEMENTS ====================

// Variables and Data Types
let name = "John Doe";           // String
const age = 25;                 // Number
var isStudent = true;           // Boolean
let hobbies = ["reading", "gaming"]; // Array
let person = {                   // Object
    city: "New York",
    country: "USA"
};
let nothing = null;             // Null
let notDefined;                 // Undefined

// Operators and Type Conversion
let num1 = "10";
let num2 = 5;

// Type Conversion (explicit)
let convertedNum = Number(num1);  // String to Number
let stringNum = String(num2);     // Number to String
let boolNum = Boolean(0);         // Number to Boolean

// Operators
let sum = convertedNum + num2;    // 15
let product = num2 * 3;           // 15
let isAdult = age >= 18;          // true
let canVote = isAdult && !isStudent; // true

// Control Statements - if/else
if (age >= 18 && !isStudent) {
    console.log(`${name} can vote and is an adult`);
} else if (age >= 18 && isStudent) {
    console.log(`${name} is an adult but student`);
} else {
    console.log(`${name} is a minor`);
}

// Control Statements - switch
let day = 3;
switch(day) {
    case 1: console.log("Monday"); break;
    case 2: console.log("Tuesday"); break;
    case 3: console.log("Wednesday"); break;
    default: console.log("Invalid day");
}