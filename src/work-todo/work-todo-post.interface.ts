import { WorkTodoType } from "./work-todo.type";

import { RepeatedDaysOfTheWeekType } from "src/repeated-days-of-the-week/repeated-days-of-the-week.type";

export interface WorkTodoPostInterface extends WorkTodoType {
  repeatedDaysOfTheWeek?: RepeatedDaysOfTheWeekType[];
}
