import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { WorkTodoGetDto } from "./work-todo-get.dto";
import { WorkTodoPostDto } from "./work-todo-post.dto";

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
    let workTodoEntitiesFindResult = new Array<WorkTodo>();
    // 코스의 Id 값 알아오기
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

  async getWorkTodosByConditions(courseId?: number): Promise<WorkTodoGetDto[]> {
    const workTodoGetDtoArrayResult = new Array<WorkTodoGetDto>();

    // DTO 객체에 삽입
    /*
      SELECT *
      FROM work_todo
      INNER JOIN course c on work_todo.course_id = c.id
    */
    let queryString = getRepository(WorkTodo).createQueryBuilder("wt").innerJoinAndMapMany("wt", Course, "c", "wt.course_id = c.id");
    if (courseId) {
      queryString = queryString.where("c.id = :courseId", { courseId: courseId });
    }
    const joinResult = await queryString.getRawMany();

    for (const joinItem of joinResult) {
      // 반환을 위한 배열에 요소를 넣어주기 위한 DTO 객체
      const workTodoGetDto = new WorkTodoGetDto();

      workTodoGetDto.id = joinItem["wt_id"];
      workTodoGetDto.recurringCycleDate = joinItem["wt_recurring_cycle_date"];
      workTodoGetDto.title = joinItem["wt_title"];
      workTodoGetDto.explanation = joinItem["wt_explanation"];
      workTodoGetDto.activeDate = joinItem["wt_active_date"];
      workTodoGetDto.courseId = joinItem["c_id"];
      workTodoGetDto.courseTitle = joinItem["c_title"];
      workTodoGetDto.color = joinItem["c_color"];

      // TODO: 반복 요일에 대한 정보 리스트로 추가 하기

      workTodoGetDtoArrayResult.push(workTodoGetDto);
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
