import { IsDate, IsInt } from "class-validator";

import { WorkDoneType } from "./work-done.type";

export class WorkDoneDto implements WorkDoneType {
  @IsInt({ groups: ["generated"] })
  id: number;

  //   @IsInt({ groups: ["userInput"] })
  userId: number;

  @IsInt({ groups: ["userInput"] })
  workTodoId: number;

  //   @IsInt({ groups: ["userInput"] })
  pageId: number;

  @IsDate({ always: true })
  actionDate: Date;
}
