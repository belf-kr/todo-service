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
      workTodoPostDtoInput.activeDate,
      workTodoPostDtoInput.userId
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
    /*
        SELECT *
        FROM work_todo wt
        WHERE wt.course_id = ? AND wt.user_id = ?
    */
    let sqlQueryString = getRepository(WorkTodo)
      .createQueryBuilder("wt")
      .where("wt.course_id = :courseId", { courseId: querystringInput.courseId })
      .andWhere("wt.user_id = :userId", { userId: querystringInput.userId });
    if (querystringInput.activeDate) {
      sqlQueryString = sqlQueryString.andWhere("wt.active_date >= :activeDate", { activeDate: querystringInput.activeDate });
    }

    const workTodoEntitiesFilteredResult = await sqlQueryString.getMany();
    const workTodoGetDtoArrayResult = new Array<WorkTodoGetDto>();

    /*
      SELECT *
      FROM work_todo
              INNER JOIN course c on work_todo.course_id = c.id
              LEFT JOIN repeated_days_of_the_week rdotw on work_todo.id = rdotw.work_todo_id
    */
    sqlQueryString = getRepository(WorkTodo)
      .createQueryBuilder("wt")
      .innerJoinAndMapMany("wt", Course, "c", "wt.course_id = c.id")
      .leftJoinAndMapMany("wt", RepeatedDaysOfTheWeek, "rdotw", "wt.id = rdotw.work_todo_id");
    const workTodosJoinResult = await sqlQueryString.getRawMany();

    // 위 SELECT 구문에서 질의된 결과중 querystringInput으로 유저가 입력한 결과와 동일한 것들만 사용한다.
    for (const workTodoEntityFilteredItem of workTodoEntitiesFilteredResult) {
      /*
      WHERE wt_id = ?
      */
      const filteredWorkTodoJoinResult = workTodosJoinResult.filter((workTodoJoinItem) => workTodoJoinItem["wt_id"] === workTodoEntityFilteredItem.id);

      // 반복 정보 관련 요일 배열 생성
      const repeatedDaysOfTheWeekEntitiesResult = new Array<RepeatedDaysOfTheWeek>();
      for (const filteredJoinItem of filteredWorkTodoJoinResult) {
        const repeatedDayOfTheWeekEntity = new RepeatedDaysOfTheWeek();

        repeatedDayOfTheWeekEntity.dayOfTheWeek = filteredJoinItem["rdotw_day_of_the_week"] ?? undefined;
        repeatedDaysOfTheWeekEntitiesResult.push(repeatedDayOfTheWeekEntity);
      }

      const workTodoGetDto = WorkTodoGetDto.entityConstructor(workTodoEntityFilteredItem, repeatedDaysOfTheWeekEntitiesResult);

      workTodoGetDto.courseTitle = filteredWorkTodoJoinResult[0]["c_title"];
      workTodoGetDto.color = filteredWorkTodoJoinResult[0]["c_color"];
      workTodoGetDtoArrayResult.push(workTodoGetDto);
    }

    return workTodoGetDtoArrayResult;
  }

  async deleteWorkTodo(userId: number, id: number): Promise<void> {
    // 검색을 위한 객체
    const workTodoEntitiesInput = new Array<WorkTodo>();
    const workTodoEntityInput = new WorkTodo(id, undefined, undefined, undefined, undefined, undefined, userId);

    workTodoEntitiesInput.push(workTodoEntityInput);
    const workTodoFindResult = await this.find(workTodoEntitiesInput);

    if (workTodoFindResult.length === 0) {
      throw new HttpException({ data: "조건을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    await this.delete(workTodoEntitiesInput);
  }
}
