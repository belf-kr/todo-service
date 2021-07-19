import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

import { WorkDoneType } from "./work-done.type";

export class WorkDoneDto implements WorkDoneType {
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
