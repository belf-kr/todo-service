import { IsNotEmpty, IsString, Length } from "class-validator";

import { WorkTodoGetInterface } from "./work-todo-get.interface";
import { WorkTodoDto } from "./work-todo.dto";

import { WorkTodo } from "src/entity/work-todo.entity";

export class WorkTodoGetDto extends WorkTodoDto implements WorkTodoGetInterface {
  constructor(workTodoGetInterfaceInput?: WorkTodoGetInterface) {
    super(workTodoGetInterfaceInput);

    if (workTodoGetInterfaceInput) {
      if (workTodoGetInterfaceInput.courseTitle) {
        this.courseTitle = workTodoGetInterfaceInput.courseTitle ?? undefined;
      }

      if (workTodoGetInterfaceInput.color) {
        this.color = workTodoGetInterfaceInput.color ?? undefined;
      }
    }
  }

  static entityConstructor(workTodoEntityInput?: WorkTodo) {
    const workTodoDto = super.entityConstructor(workTodoEntityInput);
    const workTodoGetDto = new WorkTodoGetDto(workTodoDto as WorkTodoGetInterface);

    return workTodoGetDto;
  }

  @IsString({ groups: ["generated"] })
  @IsNotEmpty({ groups: ["generated"] })
  courseTitle: string;

  @IsString({ groups: ["generated"] })
  @IsNotEmpty({ groups: ["generated"] })
  @Length(7, 7, { groups: ["generated"] })
  color: string;
}
