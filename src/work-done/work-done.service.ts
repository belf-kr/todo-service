import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { WorkDoneType } from "./work-done.type";
import { WorkDoneDto } from "./work-done.dto";
import { WorkDoneQuerystringDto } from "./work-done-querystring.dto";

import { CRUDService } from "src/common/crud.service";

import { WorkDone } from "src/entity/work-done.entity";
import { WorkTodo } from "src/entity/work-todo.entity";
import { Course } from "src/entity/course.entity";

import { WorkTodoService } from "src/work-todo/work-todo.service";
import { WorkTodoQuerystringDto } from "src/work-todo/work-todo-querystring.dto";

@Injectable()
export class WorkDoneService extends CRUDService<WorkDone> {
  constructor(@InjectRepository(WorkDone) workDoneRepository: Repository<WorkDone>, private readonly workTodoService: WorkTodoService) {
    super(workDoneRepository);
  }

  async createWorkDone(workDoneTypeInput: WorkDoneType): Promise<void> {
    // 올바른 FK인지 검증한다.
    const workTodoEntitiesInput = new Array<WorkTodo>();
    const workTodoEntityInput = new WorkTodo(workDoneTypeInput.workTodoId, undefined, undefined, undefined, undefined, undefined);

    workTodoEntitiesInput.push(workTodoEntityInput);
    const workTodosSearchResult = await this.workTodoService.find(workTodoEntitiesInput);
    if (workTodosSearchResult.length == 0) {
      throw new HttpException({ data: "할 일의 id값을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    // 올바른 유저의 접근인지 검증한다.
    if (workTodosSearchResult[0].courseId.creatorId != workDoneTypeInput?.userId) {
      throw new HttpException({ data: "데이터를 처리할 수 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
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

  async getWorkDonesByConditions(querystringInput: WorkDoneQuerystringDto): Promise<WorkDoneDto[]> {
    const workDoneDtoArrayResult = new Array<WorkDoneDto>();
    /*
      FROM    work_done AS wd
    */
    let sqlQueryString = getRepository(WorkDone).createQueryBuilder("wd");

    const workTodoQuerystringInput = new WorkTodoQuerystringDto(querystringInput.userId, querystringInput.courseId);
    const wokrTodoDtoArrayResult = await this.workTodoService.getWorkTodosByConditions(workTodoQuerystringInput);
    if (wokrTodoDtoArrayResult.length === 0) {
      throw new HttpException({ data: "workTodo의 id 값을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    const workTodoIdArray = new Array<number>();
    // number 배열을 workTodoDtoArrayResult로 부터 생성한다.
    for (const item of wokrTodoDtoArrayResult) {
      workTodoIdArray.push(item.id);
    }

    /*
                INNER JOIN work_todo wt on wd.work_todo_id = wt.id
                INNER JOIN course c on wt.course_id = c.id
        WHERE   wd.work_todo_id IN (?);
      */
    sqlQueryString = sqlQueryString
      .innerJoinAndMapMany("wd", WorkTodo, "wt", "wd.work_todo_id = wt.id")
      .innerJoinAndMapMany("wt", Course, "c", "wt.course_id = c.id")
      .where("wd.user_id = :userId", { userId: querystringInput.userId })
      .andWhere("wd.work_todo_id in (:workTodoIds)", { workTodoIds: workTodoIdArray });

    // query string 을 사용해 SELECT 수행
    /*
        SELECT  wd.id,
                wd.title,
                wd.content,
                wd.user_id,
                wd.action_date,
                wd.work_todo_id
      */
    const selectResult = await sqlQueryString.getRawMany();

    // SELECT 결과 DTO 배열에 매핑
    for (const selectItem of selectResult) {
      const workDoneDto = new WorkDoneDto();

      workDoneDto.id = selectItem["wd_id"];
      workDoneDto.title = selectItem["wd_title"];
      workDoneDto.content = selectItem["wd_content"];
      workDoneDto.actionDate = selectItem["wd_action_date"];
      workDoneDto.workTodoId = selectItem["wd_work_todo_id"];

      workDoneDtoArrayResult.push(workDoneDto);
    }

    return workDoneDtoArrayResult;
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
