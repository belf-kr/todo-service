import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { WorkDoneType } from "./work-done.type";
import { WorkDoneDto } from "./work-done.dto";

import { CRUDService } from "src/common/crud.service";

import { WorkDone } from "src/entity/work-done.entity";
import { WorkTodo } from "src/entity/work-todo.entity";

import { WorkTodoService } from "src/work-todo/work-todo.service";

@Injectable()
export class WorkDoneService extends CRUDService<WorkDone> {
  constructor(@InjectRepository(WorkDone) workDoneRepository: Repository<WorkDone>, private readonly workTodoService: WorkTodoService) {
    super(workDoneRepository);
  }

  async createWorkDone(workDoneTypeInput: WorkDoneType): Promise<void> {
    // 올바른 FK인지 검증한다.
    const workTodoEntitiesInput = new Array<WorkTodo>();
    const workTodoEntityInput = new WorkTodo(workDoneTypeInput.workTodoId, undefined, undefined, undefined, undefined, undefined, undefined);

    workTodoEntitiesInput.push(workTodoEntityInput);
    const workTodosSearchResult = await this.workTodoService.find(workTodoEntitiesInput);
    if (workTodosSearchResult.length == 0) {
      throw new HttpException({ data: "할 일의 id값을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    // WorkDone 객체를 생성해 한일을 생성한다.
    const workDoneEntitiesInput = new Array<WorkDone>();
    const workDoneEntityInput = new WorkDone(
      undefined,
      workDoneTypeInput.title,
      workDoneTypeInput.content,
      workDoneTypeInput.userId,
      workTodoEntityInput,
      workDoneTypeInput.actionDate
    );

    workDoneEntitiesInput.push(workDoneEntityInput);

    await this.create(workDoneEntitiesInput);
  }

  async getWorkDone(id: number) {
    // 검색을 위한 객체
    const workDoneEntitiesInput = new Array<WorkDone>();
    const workDoneEntityInput = new WorkDone(id, undefined, undefined, undefined, undefined, undefined);

    workDoneEntitiesInput.push(workDoneEntityInput);

    const workDoneEntityFindResult = await this.find(workDoneEntitiesInput);

    if (workDoneEntityFindResult.length === 0) {
      throw new HttpException({ data: "조건을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    let workDoneEntityResult: WorkDoneDto;
    // DTO 객체에 값 입력
    for (const workDoneEntity of workDoneEntityFindResult) {
      workDoneEntityResult = WorkDoneDto.entityConstructor(workDoneEntity);
    }

    return workDoneEntityResult;
  }
}
