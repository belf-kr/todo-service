import { CourseQuerystringType } from "./course-querystring.type";

export class CourseQuerystringDto implements CourseQuerystringType {
  constructor(userId?: number, courseId?: number) {
    this.userId = userId ?? undefined;
    this.courseId = courseId ?? undefined;
  }

  userId?: number;

  courseId?: number;
}
