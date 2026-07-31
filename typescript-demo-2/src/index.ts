import { APP_NAME, APP_VERSION, CURRENT_YEAR } from "./config/constants";
import { CourseService } from "./services/CourseService";
import { getStudents } from "./services/StudentService";
import { TeacherService } from "./services/TeacherService";
import { findById, identity } from "./utils/genericHelper";
import { printTitle } from "./utils/helper";
import { isEmpty, isValidCgpa } from "./utils/validator";

printTitle(`${APP_NAME} v${APP_VERSION} (${CURRENT_YEAR})`);

const students = getStudents();
const courseService = new CourseService();
const teacherService = new TeacherService();

printTitle("Students");
students.forEach((student) => {
  const course = courseService.getCourseById(student.courseId);
  console.log(`${student.fullName} | ${course?.name ?? "Course not found"} | CGPA: ${student.cgpa} | Grade: ${student.calculateGrade()}`);
});

printTitle("Teachers");
teacherService.getTeachers().forEach((teacher) => {
  console.log(`${teacher.fullName} | ${teacher.department} | Courses: ${teacher.courseIds.join(", ")}`);
});

printTitle("Small TypeScript examples");
console.log("Generic identity:", identity("TypeScript demo"));
console.log("Student with id 1:", findById(students, 1)?.fullName);
console.log("First student has valid CGPA:", isValidCgpa(students[0]?.cgpa ?? -1));
console.log("Empty text check:", isEmpty("   "));
