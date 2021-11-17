import { CourseQuerystringType } from "./course-querystring.type";

export class CourseQuerystringDto implements CourseQuerystringType {
  constructor(userId: number) {
    this.userId = userId ?? undefined;
  }

  userId: number;
}
