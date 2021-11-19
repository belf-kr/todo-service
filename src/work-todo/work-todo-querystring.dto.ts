import { WorkTodoQuerystringType } from "./work-todo-querystring.type";

export class WorkTodoQuerystringDto implements WorkTodoQuerystringType {
  constructor(userId?: number, courseId?: number, activeDate?: Date, maximumActiveDate?: Date) {
    this.userId = userId ?? undefined;
    this.courseId = courseId ?? undefined;
    this.activeDate = activeDate ?? undefined;
    this.maximumActiveDate = maximumActiveDate ?? undefined;
  }

  userId?: number;

  courseId?: number;

  activeDate: Date;

  maximumActiveDate: Date;
}
