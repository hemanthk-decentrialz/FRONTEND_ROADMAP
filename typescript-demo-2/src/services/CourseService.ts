import { courses } from "../data/database";
import { Course } from "../models/Course";

export class CourseService {
  getCourses(): Course[] {
    return courses.map((course) => new Course(
      course.id,
      course.name,
      course.category,
      course.durationInWeeks,
      course.totalCredits,
      course.instructor,
      course.isActive,
    ));
  }

  getCourseById(id: number): Course | undefined {
    return this.getCourses().find((course) => course.id === id);
  }
}
