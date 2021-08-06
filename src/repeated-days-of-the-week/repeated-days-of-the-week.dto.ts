import { IsInt } from "class-validator";

import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";

import { RepeatedDaysOfTheWeekType } from "src/repeated-days-of-the-week/repeated-days-of-the-week.type";

export class RepeatedDaysOfTheWeekDto implements RepeatedDaysOfTheWeekType {
  static entityConstructor(repeatedDaysOfTheWeekEntity?: RepeatedDaysOfTheWeek): RepeatedDaysOfTheWeekDto {
    const repeatedDaysOfTheWeekDto = new RepeatedDaysOfTheWeekDto();

    if (repeatedDaysOfTheWeekEntity.id) {
      repeatedDaysOfTheWeekDto.id = repeatedDaysOfTheWeekEntity.id;
    }
    if (repeatedDaysOfTheWeekEntity.workTodoId) {
      repeatedDaysOfTheWeekDto.workTodoId = repeatedDaysOfTheWeekEntity.workTodoId.id;
    }
    if (repeatedDaysOfTheWeekEntity.dayOfTheWeek) {
      repeatedDaysOfTheWeekDto.dayOfTheWeek = repeatedDaysOfTheWeekEntity.dayOfTheWeek;
    }

    return repeatedDaysOfTheWeekDto;
  }

  @IsInt({ groups: ["generated"] })
  id: number;

  @IsInt({ always: true })
  workTodoId: number;

  @IsInt({ always: true })
  dayOfTheWeek: number;
}
