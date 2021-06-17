import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";

import { WorkTodo } from "src/entity/work-todo.entity";
import { WorkTodoType } from "./work-todo.type";

@Injectable()
export class WorkTodoService extends CRUDService<WorkTodo> {
  constructor(@InjectRepository(WorkTodo) workTodoRepository: Repository<WorkTodo>) {
    super(workTodoRepository);
  }

  async createWorkTodo(workTodoInput: WorkTodoType): Promise<void> {
    //   WorkTodo 객체를 생성해 할일을 생성한다.
    const workTodoEntities = new Array<WorkTodo>();
    const workTodoEntity = new WorkTodo();

    //     생성 시입력된 key value를 사용해 객체를 생성한다.
    if (workTodoInput.title) workTodoEntity.title = workTodoInput.title;
    if (workTodoInput.explanation) workTodoEntity.explanation = workTodoInput.explanation;
    if (workTodoInput.courseId) workTodoEntity.courseId = workTodoInput.courseId;
    if (workTodoInput.passedDay) workTodoEntity.passedDay = workTodoInput.passedDay;
    if (workTodoInput.recurrintCycleDate) workTodoEntity.recurringCycleDate = workTodoInput.recurrintCycleDate;
    //     기본값 입력
    workTodoEntity.addDate = new Date();
  }
}
