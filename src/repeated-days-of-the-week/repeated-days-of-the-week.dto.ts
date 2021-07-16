import { IsInt } from "class-validator";

import { RepeatedDaysOfTheWeekType } from "src/repeated-days-of-the-week/repeated-days-of-the-week.type";

export class RepeatedDaysOfTheWeekDto implements RepeatedDaysOfTheWeekType {
  @IsInt({ groups: ["generated"] })
  id: number;

  @IsInt({ always: true })
  workTodoId: number;

  @IsInt({ always: true })
  dayOfTheWeek: number;
}
