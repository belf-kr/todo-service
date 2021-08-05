import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { WorkTodoType } from "./work-todo.type";
import { WorkTodoDto } from "./work-todo.dto";

import { CRUDService } from "src/common/crud.service";

import { WorkTodo } from "src/entity/work-todo.entity";
import { Course } from "src/entity/course.entity";

import { CourseService } from "src/course/course.service";

@Injectable()
export class WorkTodoService extends CRUDService<WorkTodo> {
  constructor(@InjectRepository(WorkTodo) workTodoRepository: Repository<WorkTodo>, private readonly courseService: CourseService) {
    super(workTodoRepository);
  }

  async createWorkTodo(workTodoInput: WorkTodoType): Promise<void> {
    // 올바른 FK인지 검증한다.
    const courseEntities = new Array<Course>();
    const courseEntity = new Course();

    courseEntity.id = workTodoInput.courseId;

    courseEntities.push(courseEntity);
    const courseSearchResult = await this.courseService.find(courseEntities);
    if (courseSearchResult.length === 0) {
      throw new HttpException({ data: "코스의 id값을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    //  WorkTodo 객체를 생성해 할일을 생성한다.
    const workTodoEntities = new Array<WorkTodo>();
    const workTodoEntity = new WorkTodo();

    // 생성시 입력된 key value를 사용해 객체를 생성한다.
    workTodoEntity.title = workTodoInput.title;
    workTodoEntity.explanation = workTodoInput.explanation;
    if (workTodoInput.courseId) {
      workTodoEntity.courseId.id = workTodoInput.courseId;
    } else {
      workTodoEntity.courseId = null;
    }
    if (workTodoInput.passedDay) {
      workTodoEntity.passedDay = workTodoInput.passedDay;
    }
    if (workTodoInput.recurringCycleDate) {
      workTodoEntity.recurringCycleDate = workTodoInput.recurringCycleDate;
    }
    // 기본값 입력
    workTodoEntity.addDate = new Date();
    workTodoEntities.push(workTodoEntity);

    return this.create(workTodoEntities);
  }

  async getAllWorkTodos(): Promise<WorkTodoDto[]> {
    const workTodoDtoArrayResult = new Array<WorkTodoDto>();

    // DTO 객체에 삽입
    /*
      SELECT *
      FROM work_todo
      INNER JOIN course c on work_todo.course_id = c.id
    */
    const joinResult = await getRepository(WorkTodo).createQueryBuilder("wt").innerJoinAndMapMany("wt", Course, "c", "wt.course_id = c.id").getRawMany();

    for (const joinItem of joinResult) {
      // 반환을 위한 배열에 요소를 넣어주기 위한 DTO 객체
      const workTodoDto = new WorkTodoDto(
        joinItem["wt_id"],
        joinItem["wt_recurring_cycle_date"],
        joinItem["wt_title"],
        joinItem["wt_explanation"],
        joinItem["wt_passed_day"],
        joinItem["wt_add_date"],
        joinItem["c_id"],
        joinItem["c_title"],
        joinItem["c_color"]
      );

      // TODO: 반복 요일에 대한 정보 리스트로 추가 하기

      workTodoDtoArrayResult.push(workTodoDto);
    }

    return workTodoDtoArrayResult;
  }

  async deleteWorkTodo(id: number): Promise<void> {
    // 검색을 위한 객체
    const workTodoEntities = new Array<WorkTodo>();
    const workTodoEntity = new WorkTodo();

    // 생성시 입력된 key value를 사용해 객체를 생성한다.
    workTodoEntity.id = id;

    workTodoEntities.push(workTodoEntity);
    const workTodoFindResult = await this.find(workTodoEntities);

    if (workTodoFindResult.length === 0) {
      throw new HttpException({ data: "조건을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    return this.delete(workTodoEntities);
  }
}
