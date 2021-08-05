import { IsArray, IsDate, IsInt, IsNotEmpty, IsString, Length } from "class-validator";

import { WorkTodoType } from "./work-todo.type";

import { RepeatedDaysOfTheWeekDto } from "src/repeated-days-of-the-week/repeated-days-of-the-week.dto";

export class WorkTodoDto implements WorkTodoType {
  constructor(
    id?: number,
    recurringCycleDate?: number,
    title?: string,
    explanation?: string,
    passedDay?: number,
    addDate?: Date,
    courseId?: number,
    courseTitle?: string,
    color?: string,
    repeatedDaysOfTheWeek?: RepeatedDaysOfTheWeekDto[]
  ) {
    this.id = id;
    this.recurringCycleDate = recurringCycleDate;
    this.title = title;
    this.explanation = explanation;
    this.passedDay = passedDay;
    this.addDate = addDate;
    this.courseId = courseId;
    this.courseTitle = courseTitle;
    this.color = color;
    this.repeatedDaysOfTheWeek = repeatedDaysOfTheWeek;
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
