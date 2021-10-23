import { IsInt } from "class-validator";

import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";

import { RepeatedDaysOfTheWeekType } from "src/repeated-days-of-the-week/repeated-days-of-the-week.type";

export class RepeatedDaysOfTheWeekDto implements RepeatedDaysOfTheWeekType {
  constructor(repeatedDaysOfTheWeekTypeInput?: RepeatedDaysOfTheWeekType) {
    if (repeatedDaysOfTheWeekTypeInput !== undefined) {
      this.dayOfTheWeek = repeatedDaysOfTheWeekTypeInput.dayOfTheWeek ?? undefined;
      this.id = repeatedDaysOfTheWeekTypeInput.id ?? undefined;
      this.workTodoId = repeatedDaysOfTheWeekTypeInput.workTodoId ?? undefined;
    }
  }

  static entityConstructor(repeatedDaysOfTheWeekEntityInput: RepeatedDaysOfTheWeek) {
    const repeatedDaysOfTheWeekDto = new RepeatedDaysOfTheWeekDto();
    repeatedDaysOfTheWeekDto.id = repeatedDaysOfTheWeekDto.id ?? undefined;
    repeatedDaysOfTheWeekDto.workTodoId = repeatedDaysOfTheWeekEntityInput.workTodoId?.id ?? undefined;
    repeatedDaysOfTheWeekDto.dayOfTheWeek = repeatedDaysOfTheWeekEntityInput.dayOfTheWeek ?? undefined;

    return repeatedDaysOfTheWeekDto;
  }

  @IsInt({ groups: ["generated"] })
  id: number;

  @IsInt({ always: true })
  workTodoId: number;

  @IsInt({ always: true })
  dayOfTheWeek: number;
}
