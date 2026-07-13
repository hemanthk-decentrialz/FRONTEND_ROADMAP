// Interfaces
console.log("\n=== Interfaces ===");

interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};

console.log(`User: ${user.name}, ${user.email}`);

interface Employee extends User {
    department: string;
    salary: number;
}

const employee: Employee = {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    department: "Engineering",
    salary: 75000
};

console.log(`Employee: ${employee.name}, ${employee.department}`);