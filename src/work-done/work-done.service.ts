import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { WorkDoneType } from "./work-done.type";
import { WorkDoneDto } from "./work-done.dto";

import { CRUDService } from "src/common/crud.service";

import { WorkDone } from "src/entity/work-done.entity";
import { WorkTodo } from "src/entity/work-todo.entity";

import { WorkTodoService } from "src/work-todo/work-todo.service";
import { User } from "src/entity/user.entity";

@Injectable()
export class WorkDoneService extends CRUDService<WorkDone> {
  constructor(@InjectRepository(WorkDone) workDoneRepository: Repository<WorkDone>, private readonly workTodoService: WorkTodoService) {
    super(workDoneRepository);
  }

  async createWorkDone(workDoneInput: WorkDoneType): Promise<void> {
    //   올바른 FK인지 검증한다.
    const workTodoEntities = new Array<WorkTodo>();
    const workTodoEntity = new WorkTodo(workDoneInput.workTodoId, undefined, undefined, undefined, undefined, undefined, undefined);
    const workDoneUserIdEntity = new User(workDoneInput.userId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    workTodoEntities.push(workTodoEntity);
    const workTodoSearchResult = await this.workTodoService.find(workTodoEntities);
    if (workTodoSearchResult.length == 0) {
      throw new HttpException({ data: "할 일의 id값을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    // WorkDone 객체를 생성해 한일을 생성한다.
    const workDoneEntities = new Array<WorkDone>();
    const workDoneEntity = new WorkDone(undefined, workDoneInput.title, workDoneInput.content, workDoneUserIdEntity, workTodoEntity, workDoneInput.actionDate);

    workDoneEntities.push(workDoneEntity);

    return await this.create(workDoneEntities);
  }

  async getWorkDone(id: number) {
    // 검색을 위한 객체
    const workDoneEntities = new Array<WorkDone>();
    const workDoneEntity = new WorkDone(id, undefined, undefined, undefined, undefined, undefined);

    workDoneEntities.push(workDoneEntity);

    const workDoneFindResult = await this.find(workDoneEntities);

    if (workDoneFindResult.length === 0) {
      throw new HttpException({ data: "조건을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    // DTO 객체에 값 입력
    for (const workDoneEntity of workDoneFindResult) {
      return new WorkDoneDto(workDoneEntity);
    }
  }
}
