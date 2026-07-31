import { IPerson } from "../interfaces/IPerson";

export class Person implements IPerson {
  constructor(
    public readonly id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public age: number,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  displayProfile(): void {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.fullName}`);
    console.log(`Age: ${this.age}`);
    console.log(`Email: ${this.email}`);
  }
}
