import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { WorkTodoGetDto } from "./work-todo-get.dto";
import { WorkTodoPostDto } from "./work-todo-post.dto";
import { WorkTodoQuerystringDto } from "./work-todo-querystring.dto";

import { CRUDService } from "src/common/crud.service";

import { WorkTodo } from "src/entity/work-todo.entity";
import { Course } from "src/entity/course.entity";
import { RepeatedDaysOfTheWeek } from "src/entity/repeated-day-of-the-week.entity";

import { CourseService } from "src/course/course.service";

import { RepeatedDaysOfTheWeekService } from "src/repeated-days-of-the-week/repeated-days-of-the-week.service";

@Injectable()
export class WorkTodoService extends CRUDService<WorkTodo> {
  constructor(
    @InjectRepository(WorkTodo) workTodoRepository: Repository<WorkTodo>,
    private readonly courseService: CourseService,
    private readonly repeatedDaysOfTheWeekService: RepeatedDaysOfTheWeekService
  ) {
    super(workTodoRepository);
  }

  async createWorkTodo(workTodoPostDtoInput: WorkTodoPostDto): Promise<void> {
    // 올바른 FK인지 검증한다.
    const courseEntitiesInput = new Array<Course>();
    const courseEntityInput = new Course(workTodoPostDtoInput.courseId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    courseEntitiesInput.push(courseEntityInput);
    const courseSearchResult = await this.courseService.find(courseEntitiesInput);
    if (courseSearchResult.length === 0) {
      throw new HttpException({ data: "코스의 id값을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    //  WorkTodo 객체를 생성해 할일을 생성한다.
    const workTodoEntities = new Array<WorkTodo>();
    const workTodoEntity = new WorkTodo(
      undefined,
      courseEntityInput,
      workTodoPostDtoInput.recurringCycleDate,
      workTodoPostDtoInput.title,
      workTodoPostDtoInput.explanation,
      workTodoPostDtoInput.activeDate
    );

    workTodoEntities.push(workTodoEntity);

    await this.create(workTodoEntities);
  }

  async createRepeatedDaysOfTheWeek(workTodoPostDtoInput: WorkTodoPostDto): Promise<void> {
    // createWorkTodo 메소드에서 생성된 work todo의 id 값을 알아낸다.
    let workTodoEntitiesFindResult = new Array<WorkTodo>();
    const workTodoEntity = new WorkTodo(
      undefined,
      new Course(workTodoPostDtoInput.id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined),
      workTodoPostDtoInput.recurringCycleDate,
      workTodoPostDtoInput.title,
      workTodoPostDtoInput.explanation,
      workTodoPostDtoInput.activeDate
    );

    workTodoEntitiesFindResult.push(workTodoEntity);
    workTodoEntitiesFindResult = await this.find(workTodoEntitiesFindResult);

    const repeatedDaysOfTheWeekEntities = new Array<RepeatedDaysOfTheWeek>();

    // 사용자가 입력한 반복 요일 정보를 요일 entity 객체 배열에 저장
    for (const daysOfTheWeekItem of workTodoPostDtoInput.repeatedDaysOfTheWeek) {
      for (const workTodoEntityItem of workTodoEntitiesFindResult) {
        const repeatedDaysOfTheWeekEntity = new RepeatedDaysOfTheWeek(
          undefined,
          new WorkTodo(workTodoEntityItem.id, undefined, undefined, undefined, undefined, undefined),
          daysOfTheWeekItem
        );

        repeatedDaysOfTheWeekEntities.push(repeatedDaysOfTheWeekEntity);
      }
    }

    await this.repeatedDaysOfTheWeekService.create(repeatedDaysOfTheWeekEntities);
  }

  async getWorkTodosByConditions(querystringInput: WorkTodoQuerystringDto): Promise<WorkTodoGetDto[]> {
    const blankWorkTodoEntities = new Array<WorkTodo>();
    const workTodoEntitiesResult = await this.find(blankWorkTodoEntities);
    const workTodoGetDtoArrayResult = new Array<WorkTodoGetDto>();

    for (const workTodoEntity of workTodoEntitiesResult) {
      /*
        SELECT *
        FROM work_todo
                INNER JOIN course c on work_todo.course_id = c.id
                LEFT JOIN repeated_days_of_the_week rdotw on work_todo.id = rdotw.work_todo_id
        WHERE work_todo.id = ?
          AND c.id = ?
      */
      let queryString = getRepository(WorkTodo)
        .createQueryBuilder("wt")
        .innerJoinAndMapMany("wt", Course, "c", "wt.course_id = c.id")
        .leftJoinAndMapMany("wt", RepeatedDaysOfTheWeek, "rdotw", "wt.id = rdotw.work_todo_id")
        .where("wt.id = :workTodoId", { workTodoId: workTodoEntity.id });
      if (querystringInput?.courseId) {
        queryString = queryString.andWhere("c.id = :courseId", { courseId: querystringInput.courseId });
      }
      const joinResult = await queryString.getRawMany();

      if (joinResult.length) {
        // 특정 courseId, worktodoId를 만족하는 결과에서 요일 배열 생성하기
        const repeatedDaysOfTheWeekEntitiesResult = new Array<RepeatedDaysOfTheWeek>();
        for (const joinItem of joinResult) {
          const repeatedDayOfTheWeekEntity = new RepeatedDaysOfTheWeek();

          repeatedDayOfTheWeekEntity.dayOfTheWeek = joinItem["rdotw_day_of_the_week"] ?? undefined;
          repeatedDaysOfTheWeekEntitiesResult.push(repeatedDayOfTheWeekEntity);
        }

        const workTodoGetDto = WorkTodoGetDto.entityConstructor(workTodoEntity, repeatedDaysOfTheWeekEntitiesResult);
        workTodoGetDto.courseTitle = joinResult[0]["c_title"];
        workTodoGetDto.color = joinResult[0]["c_color"];
        workTodoGetDtoArrayResult.push(workTodoGetDto);
      }
    }

    return workTodoGetDtoArrayResult;
  }

  async deleteWorkTodo(id: number): Promise<void> {
    // 검색을 위한 객체
    const workTodoEntitiesInput = new Array<WorkTodo>();
    const workTodoEntityInput = new WorkTodo(id, undefined, undefined, undefined, undefined, undefined);

    workTodoEntitiesInput.push(workTodoEntityInput);
    const workTodoFindResult = await this.find(workTodoEntitiesInput);

    if (workTodoFindResult.length === 0) {
      throw new HttpException({ data: "조건을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    await this.delete(workTodoEntitiesInput);
  }
}
