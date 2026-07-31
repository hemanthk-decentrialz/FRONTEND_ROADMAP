import { CourseCategory } from "../enums/CourseCategory";
import { ICourse } from "../interfaces/ICourse";

export class Course implements ICourse {
  constructor(
    public readonly id: number,
    public name: string,
    public category: CourseCategory,
    public durationInWeeks: number,
    public totalCredits: number,
    public instructor: string,
    public isActive: boolean = true,
  ) {}
}
