import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

import { WorkTodoType } from "./work-todo.type";

import { WorkTodo } from "src/entity/work-todo.entity";
import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";

import { RepeatedDaysOfTheWeekDto } from "src/repeated-days-of-the-week/repeated-days-of-the-week.dto";

export class WorkTodoDto implements WorkTodoType {
  constructor(workTodoEntity?: WorkTodo, repeatedDaysOfTheWeekEntities?: RepeatedDaysOfTheWeek[]) {
    this.repeatedDaysOfTheWeek = new Array<RepeatedDaysOfTheWeekDto>();

    if (workTodoEntity.id) {
      this.id = workTodoEntity.id;
    }
    if (workTodoEntity.recurringCycleDate) {
      this.recurringCycleDate = workTodoEntity.recurringCycleDate;
    }
    if (workTodoEntity.title) {
      this.title = workTodoEntity.title;
    }
    if (workTodoEntity.explanation) {
      this.explanation = workTodoEntity.explanation;
    }
    if (workTodoEntity.passedDay) {
      this.passedDay = workTodoEntity.passedDay;
    }
    if (workTodoEntity.addDate) {
      this.addDate = workTodoEntity.addDate;
    }
    if (workTodoEntity.courseId && workTodoEntity.courseId.id !== undefined) {
      this.courseId = workTodoEntity.courseId.id;
    }

    // repeatedDaysOfTheWeekEntities 값이 존재 하는 경우
    if (repeatedDaysOfTheWeekEntities) {
      for (const repeatedDaysOfTheWeekEntity of repeatedDaysOfTheWeekEntities) {
        const repeatedDaysOfTheWeekDto = new RepeatedDaysOfTheWeekDto(repeatedDaysOfTheWeekEntity);
        this.repeatedDaysOfTheWeek.push(repeatedDaysOfTheWeekDto);
      }
    }
  }

  @IsInt({ groups: ["generated"] })
  id: number;

  @IsInt({ groups: ["userUpdate"] })
  recurringCycleDate: number;

  @IsString({ always: true })
  @IsNotEmpty({ always: true, message: "title에 해당되는 값이 존재하지 않습니다." })
  title: string;

  @IsString({ always: true })
  @IsNotEmpty({ always: true, message: "explanation에 해당되는 값이 존재하지 않습니다." })
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
