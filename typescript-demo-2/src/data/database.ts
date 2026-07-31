import { CourseCategory } from "../enums/CourseCategory";
import { StudentStatus } from "../enums/StudentStatus";
import { ICourse } from "../interfaces/ICourse";
import { IStudent } from "../interfaces/IStudent";
import { ITeacher } from "../interfaces/ITeacher";

export const students: IStudent[] = [
  { id: 1, firstName: "Hemanth", lastName: "Kumar", age: 22, email: "hemanth@gmail.com", courseId: 101, cgpa: 8.8, completedCredits: 42, totalCredits: 120, status: StudentStatus.ACTIVE },
  { id: 2, firstName: "Rahul", lastName: "Sharma", age: 21, email: "rahul@gmail.com", courseId: 102, cgpa: 7.9, completedCredits: 36, totalCredits: 120, status: StudentStatus.ACTIVE },
];

export const courses: ICourse[] = [
  { id: 101, name: "TypeScript Basics", category: CourseCategory.FRONTEND, durationInWeeks: 8, totalCredits: 4, instructor: "Anita Rao", isActive: true },
  { id: 102, name: "Database Fundamentals", category: CourseCategory.DATABASE, durationInWeeks: 6, totalCredits: 3, instructor: "Vikram Singh", isActive: true },
];

export const teachers: ITeacher[] = [
  { id: 1, firstName: "Anita", lastName: "Rao", age: 35, email: "anita@example.com", employeeId: "T-1001", department: CourseCategory.FRONTEND, courseIds: [101] },
  { id: 2, firstName: "Vikram", lastName: "Singh", age: 38, email: "vikram@example.com", employeeId: "T-1002", department: CourseCategory.DATABASE, courseIds: [102] },
];
