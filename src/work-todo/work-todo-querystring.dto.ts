import { WorkTodoQuerystringType } from "./work-todo-querystring.type";

export class WorkTodoQuerystringDto implements WorkTodoQuerystringType {
  constructor(userId: number, courseId: number) {
    this.userId = userId ?? undefined;
    this.courseId = courseId ?? undefined;
  }

  userId: number;

  courseId?: number;
}
