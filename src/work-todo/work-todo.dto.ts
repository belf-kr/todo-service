import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

import { WorkTodoType } from "./work-todo.type";

import { WorkTodo } from "src/entity/work-todo.entity";

export class WorkTodoDto implements WorkTodoType {
  constructor(workTodoTypeInput?: WorkTodoType) {
    if (workTodoTypeInput !== undefined) {
      this.activeDate = workTodoTypeInput.activeDate ?? undefined;
      this.courseId = workTodoTypeInput.courseId ?? undefined;
      this.explanation = workTodoTypeInput.explanation ?? undefined;
      this.id = workTodoTypeInput.id ?? undefined;
      this.recurringCycleDate = workTodoTypeInput.recurringCycleDate ?? undefined;
      this.title = workTodoTypeInput.title ?? undefined;
      this.userId = workTodoTypeInput.userId ?? undefined;
    }
  }

  static entityConstructor(workTodoEntityInput: WorkTodo) {
    const workTodoDto = new WorkTodoDto();

    workTodoDto.id = workTodoEntityInput.id ?? undefined;
    workTodoDto.recurringCycleDate = workTodoEntityInput.recurringCycleDate ?? undefined;
    workTodoDto.title = workTodoEntityInput.title ?? undefined;
    workTodoDto.explanation = workTodoEntityInput.explanation ?? undefined;
    workTodoDto.activeDate = workTodoEntityInput.activeDate ?? undefined;
    workTodoDto.courseId = workTodoEntityInput.courseId?.id ?? undefined;
    workTodoDto.userId = workTodoEntityInput.userId ?? undefined;

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

  @IsDate({ groups: ["usrUpdate"] })
  activeDate: Date;

  @IsInt({ always: true, message: "코스의 id값이 비어있습니다." })
  @IsNotEmpty({ always: true, message: "코스의 id값이 비어있습니다." })
  courseId: number;

  @IsInt({ always: true, message: "userId 값이 비어있습니다." })
  userId: number;
}
