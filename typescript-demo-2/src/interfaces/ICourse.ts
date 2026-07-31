import { CourseCategory } from "../enums/CourseCategory";

export interface ICourse {
  readonly id: number;

  name: string;

  category: CourseCategory;

  durationInWeeks: number;

  totalCredits: number;

  instructor: string;

  isActive: boolean;
}