import { RepeatedDaysOfTheWeekType } from "src/repeated-days-of-the-week/repeated-days-of-the-week.type";

export class RepeatedDaysOfTheWeek implements RepeatedDaysOfTheWeekType {
  id: number;
  workTodoId: number;
  dayOfTheWeek: number;
}
