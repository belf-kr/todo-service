import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

import { WorkDoneType } from "./work-done.type";

import { WorkDone } from "src/entity/work-done.entity";

export class WorkDoneDto implements WorkDoneType {
  static entityConstructor(workDoneEntity?: WorkDone): WorkDoneDto {
    const workDoneDto = new WorkDoneDto();

    if (workDoneEntity.id) {
      workDoneDto.id = workDoneEntity.id;
    }
    if (workDoneEntity.title) {
      workDoneDto.title = workDoneEntity.title;
    }
    if (workDoneEntity.content) {
      workDoneDto.content = workDoneEntity.content;
    }
    if (workDoneEntity.userId) {
      workDoneDto.userId = workDoneEntity.userId.id;
    }
    if (workDoneEntity.workTodoId) {
      workDoneDto.workTodoId = workDoneEntity.workTodoId.id;
    }
    if (workDoneEntity.actionDate) {
      workDoneDto.actionDate = workDoneEntity.actionDate;
    }

    return workDoneDto;
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
