import { IsArray } from "class-validator";

import { WorkTodoPostInterface } from "./work-todo-post.interface";
import { WorkTodoDto } from "./work-todo.dto";

import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";
import { WorkTodo } from "src/entity/work-todo.entity";

import { RepeatedDaysOfTheWeekDto } from "src/repeated-days-of-the-week/repeated-days-of-the-week.dto";

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

  static entityConstructor(workTodoEntityInput?: WorkTodo, repeatedDaysOfTheWeekEntityInput?: RepeatedDaysOfTheWeek[]) {
    const workTodoDto = super.entityConstructor(workTodoEntityInput);
    const workTodoPostDto = new WorkTodoPostDto(workTodoDto as WorkTodoPostInterface);

    workTodoPostDto.repeatedDaysOfTheWeek = new Array<RepeatedDaysOfTheWeekDto>();
    //     RepeatedDaysOfTheWeek entity 값을 입력 한 경우
    if (repeatedDaysOfTheWeekEntityInput) {
      for (const repeatedDaysOfTheWeekEntity of repeatedDaysOfTheWeekEntityInput) {
        const repeatedDaysOfTheWeekDto = RepeatedDaysOfTheWeekDto.entityConstructor(repeatedDaysOfTheWeekEntity);
        workTodoPostDto.repeatedDaysOfTheWeek.push(repeatedDaysOfTheWeekDto);
      }
    }

    return workTodoPostDto;
  }

  @IsArray()
  repeatedDaysOfTheWeek: RepeatedDaysOfTheWeekDto[];
}
