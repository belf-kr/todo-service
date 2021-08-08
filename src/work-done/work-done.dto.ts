import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

import { WorkDoneType } from "./work-done.type";

import { WorkDone } from "src/entity/work-done.entity";

export class WorkDoneDto implements WorkDoneType {
  constructor(workDoneEntity?: WorkDone) {
    if (workDoneEntity.id) {
      this.id = workDoneEntity.id;
    }
    if (workDoneEntity.title) {
      this.title = workDoneEntity.title;
    }
    if (workDoneEntity.content) {
      this.content = workDoneEntity.content;
    }
    if (workDoneEntity.userId && workDoneEntity.userId.id !== undefined) {
      this.userId = workDoneEntity.userId.id;
    }
    if (workDoneEntity.workTodoId && workDoneEntity.workTodoId.id !== undefined) {
      this.workTodoId = workDoneEntity.workTodoId.id;
    }
    if (workDoneEntity.actionDate) {
      this.actionDate = workDoneEntity.actionDate;
    }
  }

  @IsInt({ groups: ["generated"] })
  id: number;

  @IsString({ always: true, message: "title 값이 문자열이 아닙니다." })
  @IsNotEmpty({ always: true, message: "title 값이 비어있습니다." })
  title: string;

  @IsString({ always: true, message: "content 값이 문자열이 아닙니다." })
  @IsNotEmpty({ always: true, message: "content 값이 비어있습니다." })
  content: string;

  //   @IsInt({ groups: ["userInput"] })
  userId: number;

  @IsInt({ groups: ["userInput"] })
  workTodoId: number;

  @IsDate({ groups: ["userUpdate"] })
  actionDate: Date;
}
