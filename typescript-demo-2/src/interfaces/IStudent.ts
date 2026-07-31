import { StudentStatus } from "../enums/StudentStatus";
import { IPerson } from "./IPerson";

export interface IStudent extends IPerson {
  courseId: number;

  cgpa: number;

  completedCredits: number;

  totalCredits: number;

  status: StudentStatus;
}