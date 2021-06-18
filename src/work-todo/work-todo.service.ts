import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";

import { WorkTodo } from "src/entity/work-todo.entity";
import { WorkTodoType } from "./work-todo.type";
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

    if (workTodoInput.courseId) courseEntity.id = workTodoInput.courseId;
    else throw new Error("코스의 id 값이 비어있습니다.");

    courseEntities.push(courseEntity);
    const courseSearchResult = await this.courseService.find(courseEntities);
    if (courseSearchResult.length === 0) throw new Error("코스의 id값을 만족하는 데이터가 없습니다.");

    //  WorkTodo 객체를 생성해 할일을 생성한다.
    const workTodoEntities = new Array<WorkTodo>();
    const workTodoEntity = new WorkTodo();

    // 생성 시입력된 key value를 사용해 객체를 생성한다.
    if (workTodoInput.title) workTodoEntity.title = workTodoInput.title;
    if (workTodoInput.explanation) workTodoEntity.explanation = workTodoInput.explanation;
    if (workTodoInput.courseId) workTodoEntity.courseId = workTodoInput.courseId;
    else workTodoEntity.courseId = null;
    if (workTodoInput.passedDay) workTodoEntity.passedDay = workTodoInput.passedDay;
    if (workTodoInput.recurrintCycleDate) workTodoEntity.recurringCycleDate = workTodoInput.recurrintCycleDate;
    // 기본값 입력
    workTodoEntity.addDate = new Date();
    workTodoEntities.push(workTodoEntity);

    return this.create(workTodoEntities);
  }
}
