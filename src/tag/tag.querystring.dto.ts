import { TagQuerystringType } from "./tag.querystring.type";

export class TagQuerystringDto implements TagQuerystringType {
  constructor(courseId?: number) {
    this.courseId = courseId ?? undefined;
  }

  courseId?: number;
}
