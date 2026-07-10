// Classes
console.log("\n=== Classes ===");

class Animal {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    speak(): void {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, age: number, breed: string) {
        super(name, age);
        this.breed = breed;
    }

    speak(): void {
        console.log(`${this.name} barks!`);
    }
}

const dog = new Dog("Rex", 3, "German Shepherd");
dog.speak();
console.log(`${dog.name} is ${dog.age} years old`);