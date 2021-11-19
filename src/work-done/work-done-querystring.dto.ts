import { WorkDoneQuerystringType } from "./work-done-querystring.type";

export class WorkDoneQuerystringDto implements WorkDoneQuerystringType {
  constructor(userId?: number, courseId?: number) {
    this.userId = userId ?? undefined;
    this.courseId = courseId ?? undefined;
  }

  userId?: number;

  courseId?: number;
}
