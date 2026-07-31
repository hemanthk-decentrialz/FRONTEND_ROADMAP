import { Person } from "./Person";
import { CourseCategory } from "../enums/CourseCategory";
import { ITeacher } from "../interfaces/ITeacher";

export class Teacher extends Person implements ITeacher {
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    public employeeId: string,
    public department: CourseCategory,
    public courseIds: number[] = [],
  ) {
    super(id, firstName, lastName, email, age);
  }

  assignCourse(courseId: number): void {
    if (!this.courseIds.includes(courseId)) this.courseIds.push(courseId);
  }
}
