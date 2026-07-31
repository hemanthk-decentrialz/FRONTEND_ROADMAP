import { students } from "../data/database";
import { Student } from "../models/Student";
import { IStudent } from "../interfaces/IStudent";

export function getStudents(): Student[] {
  return students.map((student: IStudent) => new Student(
    student.id,
    student.firstName,
    student.lastName,
    student.email,
    student.age,
    student.courseId,
    student.cgpa,
    student.completedCredits,
    student.totalCredits,
    student.status,
  ));
}

export function findStudentById(id: number): Student | undefined {
  return getStudents().find((student) => student.id === id);
}
