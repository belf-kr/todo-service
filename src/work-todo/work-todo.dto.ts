import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

import { WorkTodoType } from "./work-todo.type";

import { WorkTodo } from "src/entity/work-todo.entity";
import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";

import { RepeatedDaysOfTheWeekDto } from "src/repeated-days-of-the-week/repeated-days-of-the-week.dto";

export class WorkTodoDto implements WorkTodoType {
  constructor(workTodoTypeInput?: WorkTodoType) {
    if (workTodoTypeInput !== undefined) {
      this.addDate = workTodoTypeInput.addDate ?? undefined;
      this.color = workTodoTypeInput.color ?? undefined;
      this.courseId = workTodoTypeInput.courseId ?? undefined;
      this.courseTitle = workTodoTypeInput.courseTitle ?? undefined;
      this.explanation = workTodoTypeInput.explanation ?? undefined;
      this.id = workTodoTypeInput.id ?? undefined;
      this.passedDay = workTodoTypeInput.passedDay ?? undefined;
      this.recurringCycleDate = workTodoTypeInput.recurringCycleDate ?? undefined;
      this.repeatedDaysOfTheWeek = workTodoTypeInput.repeatedDaysOfTheWeek ?? undefined;
      this.title = workTodoTypeInput.title ?? undefined;
    }
  }

  static entityConstructor(workTodoEntityInput: WorkTodo, repeatedDaysOfTheWeekEntitiesInput: RepeatedDaysOfTheWeek[]) {
    const workTodoDto = new WorkTodoDto();
    workTodoDto.repeatedDaysOfTheWeek = new Array<RepeatedDaysOfTheWeekDto>();

    workTodoDto.id = workTodoEntityInput.id ?? undefined;
    workTodoDto.recurringCycleDate = workTodoEntityInput.recurringCycleDate ?? undefined;
    workTodoDto.title = workTodoEntityInput.title ?? undefined;
    workTodoDto.explanation = workTodoEntityInput.explanation ?? undefined;
    workTodoDto.passedDay = workTodoEntityInput.passedDay ?? undefined;
    workTodoDto.addDate = workTodoEntityInput.addDate ?? undefined;
    workTodoDto.courseId = workTodoEntityInput.courseId?.id ?? undefined;

    // repeatedDaysOfTheWeekEntities 값이 존재 하는 경우
    if (repeatedDaysOfTheWeekEntitiesInput !== undefined) {
      for (const repeatedDaysOfTheWeekEntityInput of repeatedDaysOfTheWeekEntitiesInput) {
        const repeatedDaysOfTheWeekDto = RepeatedDaysOfTheWeekDto.entityConstructor(repeatedDaysOfTheWeekEntityInput);
        workTodoDto.repeatedDaysOfTheWeek.push(repeatedDaysOfTheWeekDto);
      }
    }

    return workTodoDto;
  }

  @IsInt({ groups: ["generated"] })
  id: number;

  @IsInt({ groups: ["userUpdate"] })
  recurringCycleDate: number;

  @IsString({ always: true })
  @IsNotEmpty({ always: true, message: "title에 해당되는 값이 존재하지 않습니다." })
  title: string;

  @IsString({})
  @IsNotEmpty({ message: "explanation에 해당되는 값이 존재하지 않습니다." })
  explanation: string;

  @IsInt({ groups: ["generated"] })
  passedDay: number;

  @IsDate({ groups: ["generated"] })
  addDate: Date;

  @IsInt({ always: true })
  @IsNotEmpty({ always: true, message: "코스의 id값이 비어있습니다." })
  courseId: number;

  @IsString({ groups: ["generated"] })
  @IsNotEmpty({ groups: ["generated"] })
  courseTitle: string;

  @IsString({ groups: ["generated"] })
  @IsNotEmpty({ groups: ["generated"] })
  @Length(7, 7, { groups: ["generated"] })
  color: string;

  @IsArray()
  repeatedDaysOfTheWeek: RepeatedDaysOfTheWeekDto[];
}
