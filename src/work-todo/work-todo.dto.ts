import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

import { WorkTodoType } from "./work-todo.type";

import { RepeatedDaysOfTheWeekType } from "src/repeated-days-of-the-week/repeated-days-of-the-week.type";

export class WorkTodoDto implements WorkTodoType {
  @IsInt({ groups: ["generated"] })
  id: number;

  @IsInt({ groups: ["userUpdate"] })
  recurrintCycleDate: number;

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

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  courseTitle: string;

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  @Length(7, 7, { always: true })
  color: string;

  @IsArray()
  repeatedDaysOfTheWeek: RepeatedDaysOfTheWeekType[];
}
