import { CourseCategory } from "../enums/CourseCategory";
import { IPerson } from "./IPerson";

export interface ITeacher extends IPerson {
  employeeId: string;
  department: CourseCategory;
  courseIds: number[];
}
