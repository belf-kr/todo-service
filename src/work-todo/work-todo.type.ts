import { RepeatedDaysOfTheWeekType } from "src/repeated-days-of-the-week/repeated-days-of-the-week.type";

export type WorkTodoType = {
  id: number;
  recurrintCycleDate: number;
  title: string;
  explanation: string;
  passedDay: number;
  addDate: Date;
  courseId: number;
  courseTitle: string;
  color: string;
  repeatedDaysOfTheWeek?: RepeatedDaysOfTheWeekType[];
};
