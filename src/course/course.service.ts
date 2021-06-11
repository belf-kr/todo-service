import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";
import { Course } from "src/entity/course.entity";

type TagType = {
  value: string;
};

type CourseType = {
  originalCourseID: number;
  color: string;
  creatorID: number;
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
        coursesInput.originalCourseID,
        coursesInput.color,
        coursesInput.creatorID,
        coursesInput.explanation,
        coursesInput.title,
        coursesInput.likeCount
      )
    );

    return this.create(courseEntities);

    // TODO: Course 객체에 대한 Tag를 삽입한다.
  }
}
