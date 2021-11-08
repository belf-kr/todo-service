import { IsArray, IsNotEmpty, IsString } from "class-validator";

import { WorkTodoPostInterface } from "./work-todo-post.interface";
import { WorkTodoDto } from "./work-todo.dto";

import { WorkTodo } from "src/entity/work-todo.entity";

export class WorkTodoPostDto extends WorkTodoDto implements WorkTodoPostInterface {
  constructor(workTodoPostInterfaceInput?: WorkTodoPostInterface) {
    super();

    if (workTodoPostInterfaceInput) {
      super(workTodoPostInterfaceInput);

      if (workTodoPostInterfaceInput.repeatedDaysOfTheWeek) {
        this.repeatedDaysOfTheWeek = workTodoPostInterfaceInput.repeatedDaysOfTheWeek ?? undefined;
      }
    }
  }

  static entityConstructor(workTodoEntityInput?: WorkTodo) {
    const workTodoDto = super.entityConstructor(workTodoEntityInput);
    const workTodoPostDto = new WorkTodoPostDto(workTodoDto as WorkTodoPostInterface);

    workTodoPostDto.repeatedDaysOfTheWeek = new Array<number>();

    return workTodoPostDto;
  }

  @IsArray({ always: true, message: "repeatedDaysOfTheWeek key 값이 존재하지 않습니다." })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  repeatedDaysOfTheWeek: number[];
}
