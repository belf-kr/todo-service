import { WorkDoneQuerystringType } from "./work-done-querystring.type";

export class WorkDoneQuerystringDto implements WorkDoneQuerystringType {
  constructor(courseId: number) {
    this.courseId = courseId ?? undefined;
  }

  courseId: number;
}
