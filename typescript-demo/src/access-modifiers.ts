// Access Modifiers
console.log("\n=== Access Modifiers ===");

class Person {
    public name: string;
    private ssn: string;
    protected age: number;

    constructor(name: string, ssn: string, age: number) {
        this.name = name;
        this.ssn = ssn;
        this.age = age;
    }

    getInfo(): string {
        return `${this.name}, Age: ${this.age}`;
    }
}

class Employee extends Person {
    salary: number;

    constructor(name: string, ssn: string, age: number, salary: number) {
        super(name, ssn, age);
        this.salary = salary;
    }

    getEmployeeInfo(): string {
        return `${this.name}, Age: ${this.age}, Salary: $${this.salary}`;
    }
}

const employee = new Employee("Alice", "123-45-6789", 30, 75000);
console.log(employee.getEmployeeInfo());
console.log(employee.name); // Public - accessible
// console.log(employee.ssn); // Private - inaccessible