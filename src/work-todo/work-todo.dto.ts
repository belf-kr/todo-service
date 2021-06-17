import { WorkTodoType } from "./work-todo.type";

import { RepeatedDaysOfTheWeekType } from "src/repeated-days-of-the-week/repeated-days-of-the-week.type";

export class WorkTodoDto implements WorkTodoType {
  id?: number;
  courseId: number;
  recurrintCycleDate: number;
  title: string;
  explanation: string;
  passedDay: number;
  addDate: Date;
  repeatedDaysOfTheWeek?: RepeatedDaysOfTheWeekType[];
}
