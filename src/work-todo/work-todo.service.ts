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

  async createWorkTodo(workTodoTypeInput: WorkTodoType): Promise<void> {
    // 올바른 FK인지 검증한다.
    const courseEntitiesInput = new Array<Course>();
    const courseEntityInput = new Course(workTodoTypeInput.courseId, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

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
      workTodoTypeInput.recurringCycleDate,
      workTodoTypeInput.title,
      workTodoTypeInput.explanation,
      workTodoTypeInput.passedDay,
      new Date()
    );

    workTodoEntities.push(workTodoEntity);

    await this.create(workTodoEntities);
  }

  async getWorkTodosByConditions(courseId: number): Promise<WorkTodoDto[]> {
    const workTodoDtoArrayResult = new Array<WorkTodoDto>();

    // DTO 객체에 삽입
    /*
      SELECT *
      FROM work_todo
      INNER JOIN course c on work_todo.course_id = c.id
    */
    const joinResult = await getRepository(WorkTodo)
      .createQueryBuilder("wt")
      .innerJoinAndMapMany("wt", Course, "c", "wt.course_id = c.id")
      .where("c.id = :courseId", { courseId: courseId })
      .getRawMany();

    for (const joinItem of joinResult) {
      // 반환을 위한 배열에 요소를 넣어주기 위한 DTO 객체
      const workTodoDto = new WorkTodoDto();

      workTodoDto.id = joinItem["wt_id"];
      workTodoDto.recurringCycleDate = joinItem["wt_recurring_cycle_date"];
      workTodoDto.title = joinItem["wt_title"];
      workTodoDto.explanation = joinItem["wt_explanation"];
      workTodoDto.passedDay = joinItem["wt_passed_day"];
      workTodoDto.addDate = joinItem["wt_add_date"];
      workTodoDto.courseId = joinItem["c_id"];
      workTodoDto.courseTitle = joinItem["c_title"];
      workTodoDto.color = joinItem["c_color"];

      // TODO: 반복 요일에 대한 정보 리스트로 추가 하기

      workTodoDtoArrayResult.push(workTodoDto);
    }

    return workTodoDtoArrayResult;
  }

  async deleteWorkTodo(id: number): Promise<void> {
    // 검색을 위한 객체
    const workTodoEntitiesInput = new Array<WorkTodo>();
    const workTodoEntityInput = new WorkTodo(id, undefined, undefined, undefined, undefined, undefined, undefined);

    workTodoEntitiesInput.push(workTodoEntityInput);
    const workTodoFindResult = await this.find(workTodoEntitiesInput);

    if (workTodoFindResult.length === 0) {
      throw new HttpException({ data: "조건을 만족하는 데이터가 없습니다.", status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    }

    await this.delete(workTodoEntitiesInput);
  }
}
