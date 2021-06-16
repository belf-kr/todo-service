import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";

import { CourseType } from "src/course/course.type";

import { Course } from "src/entity/course.entity";

@Injectable()
export class CourseService extends CRUDService<Course> {
  constructor(@InjectRepository(Course) courseRepository: Repository<Course>) {
    super(courseRepository);
  }

  async createCourse(coursesInput: CourseType): Promise<void> {
    // Course 객체를 생성해 코스를 생성한다.
    const courseEntities = new Array<Course>();
    const courseEntity = new Course();

    courseEntity.title = coursesInput.title;
    courseEntity.explanation = coursesInput.explanation;
    courseEntity.color = coursesInput.color;
    courseEntity.creatorId = coursesInput.creatorId;
    courseEntity.endDate = coursesInput.endDate;
    courseEntity.startDate = coursesInput.startDate;
    courseEntity.likeCount = 0;
    courseEntities.push(courseEntity);

    return this.create(courseEntities);
  }

  async getAllCourses(): Promise<Course[]> {
    const blankCourses: Course[] = new Array<Course>();
    const res = await this.find(blankCourses);

    return res;
  }

  async deleteCourse(courseInput: CourseType): Promise<void> {
    const selectResult = await getRepository(Course).createQueryBuilder("c").where("c.id = :courseId", { courseId: courseInput.id }).getMany();

    selectResult.forEach((coruseItem) => {
      const courseEntity = new Course();
      courseEntity.id = coruseItem.id;
    });
    console.log(selectResult);
    return this.delete(selectResult);
  }
}
