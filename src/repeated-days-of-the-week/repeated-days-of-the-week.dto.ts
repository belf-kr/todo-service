import { IsInt } from "class-validator";

import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";

import { RepeatedDaysOfTheWeekType } from "src/repeated-days-of-the-week/repeated-days-of-the-week.type";

export class RepeatedDaysOfTheWeekDto implements RepeatedDaysOfTheWeekType {
  constructor(repeatedDaysOfTheWeekEntity?: RepeatedDaysOfTheWeek) {
    if (repeatedDaysOfTheWeekEntity.id) {
      this.id = repeatedDaysOfTheWeekEntity.id;
    }
    if (repeatedDaysOfTheWeekEntity.workTodoId && repeatedDaysOfTheWeekEntity.workTodoId.id !== undefined) {
      this.workTodoId = repeatedDaysOfTheWeekEntity.workTodoId.id;
    }
    if (repeatedDaysOfTheWeekEntity.dayOfTheWeek) {
      this.dayOfTheWeek = repeatedDaysOfTheWeekEntity.dayOfTheWeek;
    }
  }

  @IsInt({ groups: ["generated"] })
  id: number;

  @IsInt({ always: true })
  workTodoId: number;

  @IsInt({ always: true })
  dayOfTheWeek: number;
}
