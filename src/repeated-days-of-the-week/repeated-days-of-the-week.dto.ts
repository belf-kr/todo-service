import { RepeatedDaysOfTheWeekType } from "./repeated-days-of-the-week.type";

export class RepeatedDaysOfTheWeek implements RepeatedDaysOfTheWeekType {
  id?: number;
  workTodoId: number;
  dayOfTheWeek: number;
}
