import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

import { WorkDoneType } from "./work-done.type";

import { WorkDone } from "src/entity/work-done.entity";

export class WorkDoneDto implements WorkDoneType {
  constructor(workDoneTypeInput?: WorkDoneType) {
    if (workDoneTypeInput !== undefined) {
      this.actionDate = workDoneTypeInput.actionDate ?? undefined;
      this.content = workDoneTypeInput.content ?? undefined;
      this.id = workDoneTypeInput.id ?? undefined;
      this.title = workDoneTypeInput.title ?? undefined;
      this.userId = workDoneTypeInput.userId ?? undefined;
      this.workTodoId = workDoneTypeInput.workTodoId ?? undefined;
    }
  }

  static entityConstructor(workDoneEntityInput: WorkDone) {
    const workDoneDto = new WorkDoneDto();

    workDoneDto.id = workDoneEntityInput.id ?? undefined;
    workDoneDto.title = workDoneEntityInput.title ?? undefined;
    workDoneDto.content = workDoneEntityInput.content ?? undefined;
    workDoneDto.userId = workDoneEntityInput.userId ?? undefined;
    workDoneDto.workTodoId = workDoneEntityInput.workTodoId?.id ?? undefined;
    workDoneDto.actionDate = workDoneEntityInput.actionDate ?? undefined;

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
