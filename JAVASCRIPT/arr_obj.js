// ==================== ARRAYS + OBJECTS ====================

// Array CRUD Operations
let users = [
    {id: 1, name: "Alice", age: 25, active: true},
    {id: 2, name: "Bob", age: 30, active: false},
    {id: 3, name: "Charlie", age: 35, active: true}
];

// CREATE - Add new user
users.push({id: 4, name: "Diana", age: 28, active: true});

// READ - Find user
let user = users.find(u => u.id === 2);
console.log("Found user:", user);

// UPDATE - Update user
users = users.map(u => 
    u.id === 1 ? {...u, age: 26} : u
);

// DELETE - Remove user
users = users.filter(u => u.id !== 3);

// Array Methods
// map() - Transform array
let userNames = users.map(u => u.name.toUpperCase());
console.log("User names:", userNames);

// filter() - Filter array
let activeUsers = users.filter(u => u.active);
console.log("Active users:", activeUsers);

// reduce() - Aggregate data
let totalAge = users.reduce((sum, u) => sum + u.age, 0);
console.log("Total age:", totalAge);

// some() - Check if any matches
let hasAdult = users.some(u => u.age >= 30);
console.log("Has adult:", hasAdult);

// every() - Check if all match
let allActive = users.every(u => u.active);
console.log("All active:", allActive);

// sort() - Sort array
let sortedUsers = [...users].sort((a, b) => a.age - b.age);
console.log("Sorted by age:", sortedUsers);

// Nested Objects
let company = {
    name: "Tech Corp",
    address: {
        street: "123 Main St",
        city: "San Francisco",
        zip: "94105"
    },
    employees: users,
    getEmployeeCount() {  // Object Method
        return this.employees.length;
    },
    // Object Method with arrow function (be careful with 'this')
    getCity: () => company.address.city
};

console.log("Company city:", company.address.city);
console.log("Employee count:", company.getEmployeeCount());