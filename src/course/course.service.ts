import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";
import { Course } from "src/entity/course.entity";

type TagType = {
  value: string;
};

type CourseType = {
  originalCourseId: number;
  color: string;
  creatorId: number;
  explanation: string;
  title: string;
  likeCount: number;
  tags: TagType[];
};

@Injectable()
export class CourseService extends CRUDService<Course> {
  constructor(@InjectRepository(Course) courseRepository: Repository<Course>) {
    super(courseRepository);
  }

  async createCourse(coursesInput: CourseType): Promise<void> {
    // Course 객체를 생성해 코스를 생성한다.
    const courseEntities = new Array<Course>();
    courseEntities.push(
      new Course(
        coursesInput.originalCourseId,
        coursesInput.color,
        coursesInput.creatorId,
        coursesInput.explanation,
        coursesInput.title,
        coursesInput.likeCount
      )
    );

    return this.create(courseEntities);
  }
}
