import { WorkTodoGetInterface } from "./work-todo-get.interface";
import { WorkTodoDto } from "./work-todo.dto";

import { WorkTodo } from "src/entity/work-todo.entity";
import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";

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

      if (workTodoGetInterfaceInput.courseId) {
        this.courseId = workTodoGetInterfaceInput.courseId ?? undefined;
      }
    }
  }

  static entityConstructor(workTodoEntityInput?: WorkTodo, repeatedDaysOfTheWeekEntitiesInput?: RepeatedDaysOfTheWeek[]) {
    const workTodoDto = super.entityConstructor(workTodoEntityInput);
    const workTodoGetDto = new WorkTodoGetDto(workTodoDto as WorkTodoGetInterface);

    workTodoGetDto.repeatedDaysOfTheWeek = new Array<number>();
    // 반복 요일 정보가 존재하는 경우
    if (repeatedDaysOfTheWeekEntitiesInput[0].dayOfTheWeek) {
      for (const repeatedDayOfTheWeekEntity of repeatedDaysOfTheWeekEntitiesInput) {
        workTodoGetDto.repeatedDaysOfTheWeek.push(repeatedDayOfTheWeekEntity.dayOfTheWeek);
      }
    }

    return workTodoGetDto;
  }

  courseTitle: string;

  color: string;

  repeatedDaysOfTheWeek: number[];

  courseId: number;
}
