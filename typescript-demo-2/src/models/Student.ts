import { Grade } from "../enums/Grade";
import { StudentStatus } from "../enums/StudentStatus";
import { IStudent } from "../interfaces/IStudent";
import { Person } from "./Person";

export class Student extends Person implements IStudent {
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    public courseId: number,
    public cgpa: number,
    public completedCredits: number,
    public totalCredits: number,
    public status: StudentStatus,
  ) {
    super(id, firstName, lastName, email, age);
  }

  get isActive(): boolean {
    return this.status === StudentStatus.ACTIVE;
  }

  calculateGrade(): Grade {
    if (this.cgpa >= 9) return Grade.A_PLUS;
    if (this.cgpa >= 8) return Grade.A;
    if (this.cgpa >= 7) return Grade.B;
    if (this.cgpa >= 6) return Grade.C;
    return Grade.D;
  }

  displayStudent(): void {
    this.displayProfile();
    console.log(`CGPA: ${this.cgpa}`);
    console.log(`Grade: ${this.calculateGrade()}`);
    console.log(`Status: ${this.status}`);
  }
}
