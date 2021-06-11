import { Injectable, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CRUDService } from "src/common/crud.service";
import { Course } from "src/entity/course.entity";

@Injectable()
export class CourseService extends CRUDService<Course> {
  constructor(@InjectRepository(Course) courseRepository: Repository<Course>) {
    super(courseRepository);
  }

  @Post("create-course")
  async createCourse(courseEntity: Course[]): Promise<void> {
    return this.create(courseEntity);
  }
}
