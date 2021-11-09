import { WorkTodoQuerystringType } from "./work-todo-querystring.type";

export class WorkTodoQuerystringDto implements WorkTodoQuerystringType {
  constructor(courseId: number) {
    this.courseId = courseId ?? undefined;
  }

  courseId: number;
}
