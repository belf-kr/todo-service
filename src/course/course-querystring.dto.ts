import { CourseQuerystringType } from "./course-querystring.type";

export class CourseQuerystringDto implements CourseQuerystringType {
  constructor(userId?: number, courseId?: number, belfOnly?: boolean) {
    this.userId = userId ?? undefined;
    this.courseId = courseId ?? undefined;
    this.belfOnly = belfOnly ?? undefined;
  }

  userId?: number;

  courseId?: number;

  belfOnly?: boolean;
}
