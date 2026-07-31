import { teachers } from "../data/database";
import { Teacher } from "../models/Teacher";

export class TeacherService {
  getTeachers(): Teacher[] {
    return teachers.map((teacher) => new Teacher(
      teacher.id,
      teacher.firstName,
      teacher.lastName,
      teacher.email,
      teacher.age,
      teacher.employeeId,
      teacher.department,
      [...teacher.courseIds],
    ));
  }
}
